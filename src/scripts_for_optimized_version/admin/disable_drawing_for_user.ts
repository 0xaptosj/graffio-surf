import { CanvasTokenContract } from "../../canvas_token_contract_optimized";
import {
  ADMIN_1_PRIVATE_KEY,
  OPTIMIZED_CANVAS_TOKEN_ADDR,
  NETWORK,
} from "../../const";

const disableDrawingForUser = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    ADMIN_1_PRIVATE_KEY
  );

  return canvasTokenContract
    .disableDrawing(OPTIMIZED_CANVAS_TOKEN_ADDR)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

disableDrawingForUser();
