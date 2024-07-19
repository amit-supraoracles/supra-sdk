import dotenv from 'dotenv';
dotenv.config();
import * as aptos from "aptos";
import { Ed25519PrivateKey} from '@aptos-labs/ts-sdk';

const privateKey = Ed25519PrivateKey.generate();
let accountInstance = new aptos.AptosAccount(privateKey.toUint8Array());
let accountObject = JSON.parse(JSON.stringify(accountInstance.toPrivateKeyObject()));
console.log(accountObject);

