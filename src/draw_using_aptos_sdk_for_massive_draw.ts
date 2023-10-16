import { AptosAccount, AptosClient, BCS } from "aptos";
import { serializeVectorU16, serializeVectorU8 } from "./util";
import {
  CANVAS_CONTRACT_ADDR,
  GAS_LIMIT,
  GAS_PRICE,
  CANVAS_TOKEN_ADDR,
} from "./const";
import {
  AccountAddress,
  XYC,
  TransactionPayloadEntryFunction,
  EntryFunction,
  RawTransaction,
  ChainId,
} from "./types";

const getPayload = (canvasTokenAddr: string, xycArr: XYC[]) => {
  return [
    // BCS.bcsToBytes(AccountAddress.fromHex(canvasTokenAddr)),
    // serializeVectorU16(xycArr.map((rgbaxy) => rgbaxy.x)),
    // serializeVectorU16(xycArr.map((rgbaxy) => rgbaxy.y)),
    // serializeVectorU8(xycArr.map((rgbaxy) => rgbaxy.c)),
    BCS.bcsToBytes(AccountAddress.fromHex(canvasTokenAddr)),
    BCS.serializeVectorWithFunc(
      xycArr.map((rgbaxy) => rgbaxy.x),
      "serializeU16"
    ),
    BCS.serializeVectorWithFunc(
      xycArr.map((rgbaxy) => rgbaxy.y),
      "serializeU16"
    ),
    BCS.serializeVectorWithFunc(
      xycArr.map((rgbaxy) => rgbaxy.c),
      "serializeU8"
    ),
  ];
};

export const drawPoint = async (
  aptosClient: AptosClient,
  account: AptosAccount,
  arr: XYC[]
) => {
  const entryFunctionPayload = new TransactionPayloadEntryFunction(
    EntryFunction.natural(
      `${CANVAS_CONTRACT_ADDR}::canvas_token`,
      "draw",
      [],
      getPayload(CANVAS_TOKEN_ADDR, arr)
    )
  );

  const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
    aptosClient.getAccount(account.address()),
    aptosClient.getChainId(),
  ]);

  const rawTxn = new RawTransaction(
    // Transaction sender account address
    AccountAddress.fromHex(account.address()),
    BigInt(sequenceNumber),
    entryFunctionPayload,
    // Max gas unit to spend
    BigInt(GAS_LIMIT),
    // Gas price per unit
    BigInt(GAS_PRICE),
    // Expiration timestamp. Transaction is discarded if it is not executed within 10 seconds from now.
    BigInt(Math.floor(Date.now() / 1000) + 10),
    new ChainId(chainId)
  );

  // Sign the raw transaction with account1's private key
  const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);

  const transactionRes = await aptosClient.submitSignedBCSTransaction(bcsTxn);
  await aptosClient.waitForTransaction(transactionRes.hash, {
    checkSuccess: true,
  });
  console.log(
    "put dot:",
    `${CANVAS_TOKEN_ADDR.slice(0, 5)}...`,
    // rgbaxyArr,
    // [rgbaxy.x, rgbaxy.y],
    // [rgbaxy.r, rgbaxy.g, rgbaxy.b, rgbaxy.a],
    transactionRes.hash
  );
};
