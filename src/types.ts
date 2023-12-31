import { TxnBuilderTypes } from "aptos";

export type RGB = { r: number; g: number; b: number };
export type RGBA = RGB & { a: number };
export type RGBAXY = RGBA & { x: number; y: number };
export type XYC = {
  x: number;
  y: number;
  c: number;
};

export const {
  AccountAddress,
  ChainId,
  EntryFunction,
  RawTransaction,
  TransactionPayloadEntryFunction,
} = TxnBuilderTypes;
