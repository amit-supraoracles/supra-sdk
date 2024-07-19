# supra-sdk

The supra-l1-sdk provides a convenient way to interact with the supra chain and perform operations on supra chain.

**NOTE:** This `sdk` utilizes [aptos-sdk](https://aptos-labs.github.io/ts-sdk-doc/) and expects few things such as `keyPair` of `aptos-sdk` type, so due to this you also have to add `aptos-sdk` in your project.

This `sdk` is under development and in future we will try to completely remove dependency from `aptos-sdk`

## Install Dependencies

```
npm install aptos @aptos-labs/ts-sdk
```
```
npm install dotenv @types/dotenv --save-dev
```

## Commands 

```
npx ts-node src/createAccount.ts
```

```
npx ts-node src/getBalance.ts
```
```
npx ts-node src/generatePayload.ts
```

## Important : Format for Address and Secret Key in .env
- Ensure your address and secret **do not** include the `0x` prefix.
- Example
    - **Correct:**      `a1b2c3d4e5f67890123456789abcdef1234567890abcdef1234567890abcdef`
    - **Incorrect:** `0xa1b2c3d4e5f67890123456789abcdef1234567890abcdef1234567890abcdef`