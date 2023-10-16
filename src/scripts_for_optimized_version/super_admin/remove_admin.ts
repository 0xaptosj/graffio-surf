import { CanvasTokenContract } from "../../canvas_token_contract_optimized";
import {
  ADMIN_1_PRIVATE_KEY,
  NETWORK,
  OPTIMIZED_CANVAS_CONTRACT_OWNER_PRIVATE_KEY,
  OPTIMIZED_CANVAS_TOKEN_ADDR,
} from "../../const";
import { getAptosAccountFromPrivateKey } from "../../util";

const removeAdmin = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    OPTIMIZED_CANVAS_CONTRACT_OWNER_PRIVATE_KEY
  );

  const admin1Addr = getAptosAccountFromPrivateKey(ADMIN_1_PRIVATE_KEY)
    .address()
    .hex() as `0x${string}`;
  return canvasTokenContract
    .removeAdmin(OPTIMIZED_CANVAS_TOKEN_ADDR, admin1Addr)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
};

removeAdmin();
