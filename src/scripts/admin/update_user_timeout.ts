import { CanvasTokenContract } from "../../canvas_token_contract";
import { ADMIN_1_PRIVATE_KEY, CANVAS_TOKEN_ADDR, NETWORK } from "../../env";

const updateUserTimeout = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    ADMIN_1_PRIVATE_KEY
  );

  const timeout = 10;

  return canvasTokenContract
    .updateTimeout(CANVAS_TOKEN_ADDR, timeout)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

updateUserTimeout();
