import "dotenv/config";

import { env } from "process";

export const CANVAS_CONTRACT_OWNER_PRIVATE_KEY =
  env.CANVAS_CONTRACT_OWNER_PRIVATE_KEY!;

export const CANVAS_CONTRACT_ADDR = env.CANVAS_CONTRACT_ADDR!;
export const CANVAS_TOKEN_ADDR = env.CANVAS_TOKEN_ADDR! as `0x${string}`;

export const USER_1_PRIVATE_KEY = env.USER_1_PRIVATE_KEY!;
export const ADMIN_1_PRIVATE_KEY = env.ADMIN_1_PRIVATE_KEY!;

export const FULL_NODE_URL = env.FULL_NODE_URL!;
export const NETWORK = env.NETWORK! as "testnet" | "mainnet";
