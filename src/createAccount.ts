import dotenv from 'dotenv';
dotenv.config();
import { Ed25519PrivateKey} from '@aptos-labs/ts-sdk';

const privateKey = Ed25519PrivateKey.generate();
const publicKey = privateKey.publicKey();

console.log("\nAccount Address :", publicKey.toString());
console.log("Secret Key:",privateKey.toString());
console.log("");
