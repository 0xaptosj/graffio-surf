import { CanvasTokenContract } from "../../canvas_token_contract";
import {
  ADMIN_1_PRIVATE_KEY,
  CANVAS_CONTRACT_OWNER_PRIVATE_KEY,
  CANVAS_TOKEN_ADDR,
  NETWORK,
} from "../../env";
import { getAptosAccountFromPrivateKey } from "../../util";

const removeAdmin = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    CANVAS_CONTRACT_OWNER_PRIVATE_KEY
  );

  const admin1Addr = getAptosAccountFromPrivateKey(ADMIN_1_PRIVATE_KEY)
    .address()
    .hex() as `0x${string}`;
  return canvasTokenContract
    .removeAdmin(CANVAS_TOKEN_ADDR, admin1Addr)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

removeAdmin();
