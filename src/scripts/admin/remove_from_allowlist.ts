import { CanvasTokenContract } from "../../canvas_token_contract";
import {
  ADMIN_1_PRIVATE_KEY,
  CANVAS_TOKEN_ADDR,
  NETWORK,
  USER_1_PRIVATE_KEY,
} from "../../const";
import { getAptosAccountFromPrivateKey } from "../../util";

const removeFromAllowlist = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    ADMIN_1_PRIVATE_KEY
  );

  const user1Addr = getAptosAccountFromPrivateKey(USER_1_PRIVATE_KEY)
    .address()
    .hex() as `0x${string}`;
  return canvasTokenContract
    .removeFromAllowList(CANVAS_TOKEN_ADDR, user1Addr)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

removeFromAllowlist();
