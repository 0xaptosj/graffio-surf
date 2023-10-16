import { CanvasTokenContract } from "../../canvas_token_contract_optimized";
import {
  OPTIMIZED_CANVAS_TOKEN_ADDR,
  NETWORK,
  USER_1_PRIVATE_KEY,
} from "../../const";

const draw = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    USER_1_PRIVATE_KEY
  );

  const xs = [10, 11, 12, 13];
  const ys = [11, 12, 13, 14];
  const colorIDs = [1, 2, 3, 4];

  return canvasTokenContract
    .draw(OPTIMIZED_CANVAS_TOKEN_ADDR, xs, ys, colorIDs)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

draw();
