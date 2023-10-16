import { CanvasTokenContract } from "../../canvas_token_contract";
import { ADMIN_1_PRIVATE_KEY, CANVAS_TOKEN_ADDR, NETWORK } from "../../env";

const updateMaxPixelPerDraw = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    ADMIN_1_PRIVATE_KEY
  );

  const maxPixel = 10;

  return canvasTokenContract
    .updateMaxNumberOfPixelsPerDraw(CANVAS_TOKEN_ADDR, maxPixel)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

updateMaxPixelPerDraw();
