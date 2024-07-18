import dotenv from 'dotenv';
dotenv.config();

import * as aptos from "aptos";
import * as supraSDK from "./index";


const senderSecretKey = process.env.SENDER_SECRET_KEY;
const receiverAddress = process.env.RECEIVER_ADDRESS;


(async () => {
  let supraClient = await supraSDK.SupraClient.init(`${process.env.SUPRA_DEVNET_RPC}`);

  let senderAccount = new aptos.AptosAccount(
    Buffer.from(`${senderSecretKey}`, "hex"));

  const senderAccountAddress = senderAccount.address().toString()

  let senderAccountAddressHex = new aptos.HexString(`${senderAccountAddress}`);

  let receiverAddressHex = new aptos.HexString(`${receiverAddress}`);

  let resultSenderAccountExist = await supraClient.isAccountExists(senderAccountAddressHex)
  let resultReceiverAccountExist = await supraClient.isAccountExists(receiverAddressHex)

  let senderBalance = await supraClient.getAccountSupraCoinBalance(senderAccount.address())
  let receiverBalance =  await supraClient.getAccountSupraCoinBalance(receiverAddressHex)
  

  console.log("\nSender Address   | IsAccountExist ", senderAccountAddressHex.toString(), resultSenderAccountExist);
  console.log("Receiver Address | IsAccountExist ", receiverAddressHex.toString(), resultReceiverAccountExist);

  console.log("\nSender Balance  : ", senderBalance.toString());
  console.log("Receiver Balance: ", receiverBalance.toString());
  console.log("\n");
  
})();