import { CanvasTokenContract } from "../../canvas_token_contract";
import { CANVAS_TOKEN_ADDR, NETWORK, USER_1_PRIVATE_KEY } from "../../const";

const draw = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    USER_1_PRIVATE_KEY
  );

  const xs = [10, 11, 12, 13];
  const ys = [11, 12, 13, 14];
  const rs = [1, 1, 1, 1];
  const gs = [2, 2, 2, 2];
  const bs = [3, 3, 3, 3];

  return canvasTokenContract
    .draw(CANVAS_TOKEN_ADDR, xs, ys, rs, gs, bs)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

draw();
