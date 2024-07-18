import dotenv from 'dotenv';
dotenv.config();
import { Ed25519PrivateKey} from '@aptos-labs/ts-sdk';

const privateKey = Ed25519PrivateKey.generate();
const publicKey = privateKey.publicKey();
console.log("Private", privateKey.toString() );
console.log("Public", publicKey.toString());

