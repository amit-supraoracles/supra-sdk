import dotenv from 'dotenv';
dotenv.config();
import * as aptos from "aptos";
import * as supraSDK from "./index";


const sender_privateKey = process.env.SENDER_PRIVATE_KEY;
const receiver_publicKey = process.env.RECEIVER_PUBLIC_KEY;

(async () => {
  let supraClient = await supraSDK.SupraClient.init(`${process.env.SUPRA_DEVNET_RPC}`);

  let senderAccount = new aptos.AptosAccount(
    Buffer.from(`${sender_privateKey}`,"hex"));


  if ((await supraClient.isAccountExists(senderAccount.address())) == false) {
    console.log(
      "Funding Sender With Faucet: ",
      // To Fund Account With Test Supra Tokens
      // await supraClient.fundAccountWithFaucet(senderAccount.address())
    );
  }

  let receiverAddress = new aptos.HexString(`${receiver_publicKey}`);

  let resultReceiverAccountExist= await supraClient.isAccountExists(receiverAddress)

  console.log("Sender", senderAccount.address().toString());
  console.log("\n-----------------------------------------------------");
  console.log("Receiver", receiverAddress.toString());
  console.log("Receiver Account Exists: ", resultReceiverAccountExist);
  console.log("-----------------------------------------------------");
  
  
  let senderBalance = await supraClient.getAccountSupraCoinBalance(senderAccount.address());
  console.log("\nSender Balance ", senderBalance);
  
  // To Transfer Supra Coin From Sender To Receiver
  let txResData = await supraClient.transferSupraCoinPayload(
    senderAccount,
    receiverAddress,
    BigInt(100000000)
  );
 
})();
