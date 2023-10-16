import { PromisePool } from "@supercharge/promise-pool";
import {
  CURRENT_IMAGE_PATH,
  LEFT_POS,
  LIMIT_PER_DRAW,
  MY_OWN_FAUCET_PRIVATE_KEY,
  NUM_DRAWERS,
  OVERLAY_IMAGE_PATH,
  TOP_POS,
  USE_OPTIMIZED_VERSION,
} from "./const";
import { AccountPool, createAndFundAccount } from "./account_pool";
import {
  getAptosAccount,
  getAptosClient,
  getCoinClient,
  getSequenceNumber,
} from "./util";
import { AptosAccount } from "aptos";
import { drawPoint } from "./draw_using_aptos_sdk_for_massive_draw";
import {
  loadImageDiffBetweenOverlayAndCurrent,
  loadImageDiffBetweenOverlayAndCurrentOptimized,
} from "./calculate_image_diff";

async function main() {
  const beginTime = new Date();
  console.log("begin to run draw script: ", beginTime);

  // =================== Calculate diff ===================

  // toDraw is the diff between overlay image and current image
  // Drawing it will place overlay image on top of current image

  let toDraw = USE_OPTIMIZED_VERSION
    ? await loadImageDiffBetweenOverlayAndCurrentOptimized(
        CURRENT_IMAGE_PATH,
        OVERLAY_IMAGE_PATH,
        { centerImage: false },
        LEFT_POS,
        TOP_POS
      )
    : await loadImageDiffBetweenOverlayAndCurrent(
        CURRENT_IMAGE_PATH,
        OVERLAY_IMAGE_PATH,
        { centerImage: false },
        LEFT_POS,
        TOP_POS
      );

  console.log(`toDraw pixels count: ${toDraw.length}`);
  if (toDraw.length === 0) {
    console.log("nothing to draw");
    return;
  }

  // =================== Fund drawer accounts ===================

  const accounts: AptosAccount[] = [];
  const coinClient = getCoinClient();
  const myFaucetAccount = getAptosAccount(MY_OWN_FAUCET_PRIVATE_KEY);
  let faucetSequenceNumber = await getSequenceNumber(myFaucetAccount);
  const skipFunding = true;

  for (let i = 0; i < NUM_DRAWERS; i++) {
    const account = await createAndFundAccount(
      coinClient,
      myFaucetAccount,
      i,
      faucetSequenceNumber,
      skipFunding
    );
    faucetSequenceNumber = (
      BigInt(faucetSequenceNumber) + BigInt(1)
    ).toString();
    accounts.push(account);
  }
  const accountPool = new AccountPool(accounts);

  const finishedFundTime = new Date();
  console.log(
    `finished funding accounts: ${finishedFundTime}, time used: ${
      (finishedFundTime.getTime() - beginTime.getTime()) / 1000
    } seconds`
  );

  // =================== Start drawing ===================

  console.log("Drawing!");
  const outputEvery = 100;
  // convert toDraw to array of RGBAXY array
  let toDrawArr: [][] = [];
  for (let i = 0; i < toDraw.length; i += LIMIT_PER_DRAW) {
    let tmp: [] = [];
    for (let j = 0; j < LIMIT_PER_DRAW; j++) {
      // @ts-ignore
      tmp.push(toDraw[i + j]);
    }
    toDrawArr.push(tmp);
  }

  let drawn = 0;
  const aptosClient = getAptosClient();
  const { results, errors } = await PromisePool.for(toDrawArr)
    .withConcurrency(NUM_DRAWERS)
    .process(async (arr, index) => {
      await accountPool.withAccount(async (account) => {
        // random delay between 0 and 3 second
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 3000)
        );
        // @ts-ignore
        arr = arr.filter((rgbaxy) => rgbaxy != undefined);
        await drawPoint(aptosClient, account, arr);
      });
      drawn += LIMIT_PER_DRAW;
      if (drawn % outputEvery == 0)
        console.log(
          `\ndrawn ${drawn} / ${toDraw.length} pixels (${(
            (drawn / toDraw.length) *
            100
          ).toFixed(2)}%)\n`
        );
    });

  const finishedDrawTime = new Date();
  console.log(
    `finished to draw: ${finishedDrawTime}, time used: ${
      (finishedDrawTime.getTime() - finishedFundTime.getTime()) / 1000
    } seconds`
  );
}

main().then(() => console.log("done"));
