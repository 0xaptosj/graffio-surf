import { CanvasTokenContract } from "../../canvas_token_contract";
import {
  CANVAS_CONTRACT_OWNER_PRIVATE_KEY,
  CANVAS_TOKEN_ADDR,
  NETWORK,
  USER_1_PRIVATE_KEY,
} from "../../const";

const draw = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    CANVAS_CONTRACT_OWNER_PRIVATE_KEY
  );

  const xs = [10, 11, 12, 13];
  const ys = [11, 12, 13, 14];
  const colorIDs = [0, 1, 2, 3];

  return canvasTokenContract
    .draw(CANVAS_TOKEN_ADDR, xs, ys, colorIDs)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

draw();
