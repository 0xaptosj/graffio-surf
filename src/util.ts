import { AptosAccount, HexString } from "aptos";

export const getAptosAccountFromPrivateKey = (privateKey: string) => {
  return new AptosAccount(new HexString(privateKey).toUint8Array());
};
