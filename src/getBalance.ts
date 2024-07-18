import dotenv from 'dotenv';
dotenv.config();

import * as aptos from "aptos";
import * as supraSDK from "./index";


const sender_privateKey = process.env.SENDER_PRIVATE_KEY;
const receiver_publicKey = process.env.RECEIVER_PUBLIC_KEY;

(async () => {
  let supraClient = await supraSDK.SupraClient.init(`${process.env.SUPRA_DEVNET_RPC}`);

  let senderAccount = new aptos.AptosAccount(
    Buffer.from(`${sender_privateKey}`, "hex"));

  const SenderPublicKeyHex = Buffer.from(senderAccount.signingKey.publicKey).toString("hex");
  let senderAddress = new aptos.HexString(SenderPublicKeyHex);
  let receiverAddress = new aptos.HexString(`${receiver_publicKey}`);

  let resultReceiverAccountExist = await supraClient.isAccountExists(receiverAddress)

  console.log("\nReceiver Account Exists: ", resultReceiverAccountExist);
  console.log("Sender Address", senderAddress.toString());
  console.log("Receiver Address", receiverAddress.toString());
  

  let senderBalance = await supraClient.getAccountSupraCoinBalance(senderAddress)
  let receiverBalance =  await supraClient.getAccountSupraCoinBalance(receiverAddress)
  
  console.log("\nSender Balance  : ", senderBalance);
  console.log("Receiver Balance: ", receiverBalance);
  console.log("\n");
  
})();
