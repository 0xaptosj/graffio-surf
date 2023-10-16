import { AptosAccount } from "aptos";

const total = 10;
for (let i = 0; i < total; i++) {
  const account = new AptosAccount();
  console.log(JSON.stringify(account.toPrivateKeyObject(), null, 2));
}
