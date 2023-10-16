import { CanvasTokenContract } from "../../canvas_token_contract";
import { ADMIN_1_PRIVATE_KEY, CANVAS_TOKEN_ADDR, NETWORK } from "../../const";

const enableDrawingForUser = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    ADMIN_1_PRIVATE_KEY
  );

  return canvasTokenContract.enableDrawing(CANVAS_TOKEN_ADDR).then((res) => {
    console.log(JSON.stringify(res, null, 2));
  });
};

enableDrawingForUser();
