import { CanvasTokenContract } from "../../canvas_token_contract_optimized";
import {
  ADMIN_1_PRIVATE_KEY,
  OPTIMIZED_CANVAS_TOKEN_ADDR,
  NETWORK,
  USER_1_PRIVATE_KEY,
  DRAWER_PRIVATE_KEYS,
} from "../../const";
import { getAptosAccountFromPrivateKey } from "../../util";

const addToUnlimitedArtists = async () => {
  const canvasTokenContract = new CanvasTokenContract(
    NETWORK,
    ADMIN_1_PRIVATE_KEY
  );

  // const user1Addr = getAptosAccountFromPrivateKey(USER_1_PRIVATE_KEY)
  //   .address()
  //   .hex() as `0x${string}`;
  // return canvasTokenContract
  //   .addToUnlimitedArtists(OPTIMIZED_CANVAS_TOKEN_ADDR, user1Addr)
  //   .then((res) => {
  //     console.log(JSON.stringify(res, null, 2));
  //   });

  const drawerAddresses = DRAWER_PRIVATE_KEYS.map(
    (privateKey) =>
      getAptosAccountFromPrivateKey(privateKey).address().hex() as `0x${string}`
  );

  for (const drawerAddr of drawerAddresses) {
    await canvasTokenContract.addToUnlimitedArtists(
      OPTIMIZED_CANVAS_TOKEN_ADDR,
      drawerAddr
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

addToUnlimitedArtists();
