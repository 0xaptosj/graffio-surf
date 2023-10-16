import "dotenv/config";

import { env } from "process";

/*
// black, r: 0, g: 0, b: 0
0,
// white, r: 255, g: 255, b: 255
1,
// blue, r: 0, g: 158, b: 25
2,
// green, r: 0, g: 197, b: 3
3,
// yellow, r: 255, g: 198, b: 0
4,
// orange, r: 255, g: 125, b: 0
5,
// red, r: 250, g: 0, b: 106
6,
// violet, r: 196, g: 0, b: 199
7
*/
export const RGB_TO_COLOR_ID = {
  // "0-0-0": 0,
  // "255-255-255": 1,
  // "0-158-25": 2,
  // "0-197-3": 3,
  // "255-198-0": 4,
  // "255-125-0": 5,
  // "250-0-106": 6,
  // "196-0-199": 7,
  0: {
    r: 0,
    g: 0,
    b: 0,
  },
  1: {
    r: 255,
    g: 255,
    b: 255,
  },
  2: {
    r: 0,
    g: 158,
    b: 25,
  },
  3: {
    r: 0,
    g: 197,
    b: 3,
  },
  4: {
    r: 255,
    g: 198,
    b: 0,
  },
  5: {
    r: 255,
    g: 125,
    b: 0,
  },
  6: {
    r: 250,
    g: 0,
    b: 106,
  },
  7: {
    r: 196,
    g: 0,
    b: 199,
  },
};

export const CANVAS_CONTRACT_OWNER_PRIVATE_KEY =
  env.CANVAS_CONTRACT_OWNER_PRIVATE_KEY!;

export const CANVAS_CONTRACT_ADDR = env.CANVAS_CONTRACT_ADDR!;
export const CANVAS_TOKEN_ADDR = env.CANVAS_TOKEN_ADDR as `0x${string}`;

export const USER_1_PRIVATE_KEY = env.USER_1_PRIVATE_KEY!;
export const ADMIN_1_PRIVATE_KEY = env.ADMIN_1_PRIVATE_KEY!;

export const FULL_NODE_URL = env.FULL_NODE_URL!;
export const NETWORK = env.NETWORK! as "testnet" | "mainnet";

export const CURRENT_IMAGE_PATH = "img/snapshot_4.png";
// Reset to snapshot image
// export const OVERLAY_IMAGE_PATH = "img/snapshot_3.png";
// Place a pepe
export const OVERLAY_IMAGE_PATH = "img/pepe.png";

export const LEFT_POS = 0;
export const TOP_POS = 0;

/*
There are 2 modes
    Mode 1: 
        reset current image to snapshot image, 
        in this case overlay image is the snapshot image 
        and it has the same size as current image
        so LEFT_POS and TOP_POS must set to 0
    Mode 2:
        overlay image is a small image, 
        and it is placed at the given place of current image
        so LEFT_POS and TOP_POS are set accordingly
        e.g. if you want to place it at 100, 150 then LEFT_POS = 100, TOP_POS = 150
*/

export const LIMIT_PER_DRAW = 1000;

export const ONE_APT = 100_000_000;

export const API_TOKEN = env.API_TOKEN!;
export const API_GATEWAY_URL = "https://api.mainnet.aptoslabs.com";

export const DRAWER_PRIVATE_KEYS = env.DRAWER_PRIVATE_KEYS!.split(",");
export const NUM_DRAWERS = DRAWER_PRIVATE_KEYS.length;

export const MY_OWN_FAUCET_PRIVATE_KEY = env.MY_OWN_FAUCET_PRIVATE_KEY!;

export const GAS_LIMIT = 1_000_000;
export const GAS_PRICE = 100;
