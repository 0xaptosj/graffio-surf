import { AptosAccount, AptosClient, BCS } from "aptos";
import { serializeVectorU64, serializeVectorU8 } from "./util";
import {
  CANVAS_CONTRACT_ADDR,
  OPTIMIZED_CANVAS_CONTRACT_ADDR,
  GAS_LIMIT,
  GAS_PRICE,
  USE_OPTIMIZED_VERSION,
  OPTIMIZED_CANVAS_TOKEN_ADDR,
  CANVAS_TOKEN_ADDR,
} from "./const";
import {
  RGBAXY,
  AccountAddress,
  XYC,
  TransactionPayloadEntryFunction,
  EntryFunction,
  RawTransaction,
  ChainId,
} from "./types";

const getPayload = (canvasTokenAddr: `0x${string}`, rgbaxyArr: RGBAXY[]) => {
  return [
    BCS.bcsToBytes(AccountAddress.fromHex(canvasTokenAddr)),
    serializeVectorU64(rgbaxyArr.map((rgbaxy) => rgbaxy.x)),
    serializeVectorU64(rgbaxyArr.map((rgbaxy) => rgbaxy.y)),
    serializeVectorU8(rgbaxyArr.map((rgbaxy) => rgbaxy.r)),
    serializeVectorU8(rgbaxyArr.map((rgbaxy) => rgbaxy.g)),
    serializeVectorU8(rgbaxyArr.map((rgbaxy) => rgbaxy.b)),
  ];
};

const getOptimizedPayload = (canvasTokenAddr: `0x${string}`, xycArr: XYC[]) => {
  return [
    BCS.bcsToBytes(AccountAddress.fromHex(canvasTokenAddr)),
    serializeVectorU64(xycArr.map((rgbaxy) => rgbaxy.x)),
    serializeVectorU64(xycArr.map((rgbaxy) => rgbaxy.y)),
    serializeVectorU8(xycArr.map((rgbaxy) => rgbaxy.c)),
  ];
};

export const drawPoint = async (
  aptosClient: AptosClient,
  account: AptosAccount,
  arr: RGBAXY[] | XYC[]
) => {
  const canvasContractAddr = USE_OPTIMIZED_VERSION
    ? OPTIMIZED_CANVAS_CONTRACT_ADDR
    : CANVAS_CONTRACT_ADDR;
  const canvasTokenAddr = USE_OPTIMIZED_VERSION
    ? OPTIMIZED_CANVAS_TOKEN_ADDR
    : CANVAS_TOKEN_ADDR;

  const entryFunctionPayload = new TransactionPayloadEntryFunction(
    EntryFunction.natural(
      `${canvasContractAddr}::canvas_token`,
      "draw",
      [],
      USE_OPTIMIZED_VERSION
        ? // @ts-ignore
          getOptimizedPayload(canvasTokenAddr, arr)
        : // @ts-ignore
          getPayload(canvasTokenAddr, arr)
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
    `${canvasTokenAddr.slice(0, 5)}...`,
    // rgbaxyArr,
    // [rgbaxy.x, rgbaxy.y],
    // [rgbaxy.r, rgbaxy.g, rgbaxy.b, rgbaxy.a],
    transactionRes.hash
  );
};
