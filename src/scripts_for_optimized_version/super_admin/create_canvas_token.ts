import { CanvasTokenContract } from "../../canvas_token_contract_optimized";
import {
  OPTIMIZED_CANVAS_CONTRACT_OWNER_PRIVATE_KEY,
  FULL_NODE_URL,
  NETWORK,
} from "../../const";

const createCanvasToken = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    OPTIMIZED_CANVAS_CONTRACT_OWNER_PRIVATE_KEY
  );

  const name = "canvas token";
  const description = "canvas token";
  const width = 1000;
  const height = 1000;
  const perAccountTimeoutS = 5;
  const defaultColorID = 5;
  const maxNumberOfPixelsPerDraw = 5000;
  const drawEnabledForNonAdmin = true;

  return canvasTokenContract
    .createCanvasToken(
      name,
      description,
      width,
      height,
      perAccountTimeoutS,
      defaultColorID,
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
