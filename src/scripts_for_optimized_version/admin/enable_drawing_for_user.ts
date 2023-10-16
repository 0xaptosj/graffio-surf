import { CanvasTokenContract } from "../../canvas_token_contract_optimized";
import {
  ADMIN_1_PRIVATE_KEY,
  OPTIMIZED_CANVAS_TOKEN_ADDR,
  NETWORK,
} from "../../const";

const enableDrawingForUser = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    ADMIN_1_PRIVATE_KEY
  );

  return canvasTokenContract
    .enableDrawing(OPTIMIZED_CANVAS_TOKEN_ADDR)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

enableDrawingForUser();