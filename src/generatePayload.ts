import dotenv from 'dotenv';
dotenv.config();
import * as aptos from "aptos";
import * as supraSDK from "./index";


const senderSecretKey = process.env.SENDER_SECRET_KEY;
const receiverAddress = process.env.RECEIVER_ADDRESS;

(async () => {
  
  let supraClient = await supraSDK.SupraClient.init(`${process.env.SUPRA_DEVNET_RPC}`);

  let senderAccount = new aptos.AptosAccount(
    Buffer.from(`${senderSecretKey}`,"hex"));

  
  let receiverAddressHex = new aptos.HexString(`${receiverAddress}`);
  let resultReceiverAccountExist= await supraClient.isAccountExists(receiverAddressHex)
  let resultSenderAccountExist= await supraClient.isAccountExists(receiverAddressHex)

  const senderPublicKey = Buffer.from(senderAccount.signingKey.publicKey).toString("hex");
  let senderAddressHex = new aptos.HexString(senderPublicKey);

  if (resultSenderAccountExist == false) {
    console.log("This account is not created yet, please get some faucet and try again!!")
    console.log(senderAccount.address())
  }

  console.log("\n-----------------------------------------------------");
  console.log("Sender", senderAddressHex.toString());
  console.log("Sender Account Exists: ", resultSenderAccountExist);
  console.log("-----------------------------------------------------");

  console.log("\n-----------------------------------------------------");
  console.log("Receiver", receiverAddressHex.toString());
  console.log("Receiver Account Exists: ", resultReceiverAccountExist);
  console.log("-----------------------------------------------------");
  
  
  let senderBalance = await supraClient.getAccountSupraCoinBalance(senderAddressHex);
  let receiverBalance = await supraClient.getAccountSupraCoinBalance(receiverAddressHex);
  console.log("\nSender Balance ", senderBalance.toString());
  console.log("Receiver Balance ", receiverBalance.toString());
  
  // To Transfer Supra Coin From Sender To Receiver
  let txResData = await supraClient.transferSupraCoinPayload(
    senderAccount,
    receiverAddressHex,
    BigInt(1000)
  );
 
})();
