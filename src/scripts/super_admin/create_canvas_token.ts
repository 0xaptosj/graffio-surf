import { CanvasTokenContract } from "../../canvas_token_contract";
import {
  CANVAS_CONTRACT_OWNER_PRIVATE_KEY,
  FULL_NODE_URL,
  NETWORK,
} from "../../const";

const createCanvasToken = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    CANVAS_CONTRACT_OWNER_PRIVATE_KEY
  );

  const name = "canvas token";
  const description = "canvas token";
  const width = 1000;
  const height = 1000;
  const perAccountTimeoutS = 0;
  const canDrawForS = 1_000_000_000;
  const cost = 0;
  const costMultiplier = 1;
  const costMultiplierDecayS = 1;
  const defaultColorR = 1;
  const defaultColorG = 1;
  const defaultColorB = 1;
  const canDrawMultiplePixelsAtOnce = true;
  const ownerIsSuperAdmin = true;
  const maxNumberOfPixelsPerDraw = 5000;
  const drawEnabledForNonAdmin = true;

  return canvasTokenContract
    .createCanvasToken(
      name,
      description,
      width,
      height,
      perAccountTimeoutS,
      canDrawForS,
      cost,
      costMultiplier,
      costMultiplierDecayS,
      defaultColorR,
      defaultColorG,
      defaultColorB,
      canDrawMultiplePixelsAtOnce,
      ownerIsSuperAdmin,
      maxNumberOfPixelsPerDraw,
      drawEnabledForNonAdmin
    )
    .then((res) => {
      // console.log(res.hash);
      return fetch(`${FULL_NODE_URL}/v1/transactions/by_hash/${res.hash}`);
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // @ts-ignore
      const canvasTokenAddr = res.events[0].data.token;
      console.log(`canvasTokenAddr: ${canvasTokenAddr}`);
      return canvasTokenAddr;
    });
};

createCanvasToken();
