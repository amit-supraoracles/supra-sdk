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

  const senderPublicKeyHex = Buffer.from(senderAccount.signingKey.publicKey).toString("hex");
  let senderAddress = new aptos.HexString(senderPublicKeyHex);
  let receiverAddressHex = new aptos.HexString(`${receiverAddress}`);

  let resultReceiverAccountExist = await supraClient.isAccountExists(receiverAddressHex)

  let senderBalance = await supraClient.getAccountSupraCoinBalance(senderAddress)
  let receiverBalance =  await supraClient.getAccountSupraCoinBalance(receiverAddressHex)
  
  console.log("\nReceiver Account Exists: ", resultReceiverAccountExist);
  console.log("Sender Address", senderAddress.toString());
  console.log("Receiver Address", receiverAddressHex.toString());

  console.log("\nSender Balance  : ", senderBalance);
  console.log("Receiver Balance: ", receiverBalance);
  console.log("\n");
  
})();