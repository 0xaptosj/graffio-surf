import { CanvasTokenContract } from "../../canvas_token_contract_optimized";
import {
  ADMIN_1_PRIVATE_KEY,
  OPTIMIZED_CANVAS_TOKEN_ADDR,
  NETWORK,
} from "../../const";

const updateUserTimeout = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    ADMIN_1_PRIVATE_KEY
  );

  const timeout = 10;

  return canvasTokenContract
    .updateTimeout(OPTIMIZED_CANVAS_TOKEN_ADDR, timeout)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

updateUserTimeout();
