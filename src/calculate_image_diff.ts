import Jimp from "jimp";
import { RGBAXY, XYC } from "./types";
import {
  CURRENT_IMAGE_PATH,
  OVERLAY_IMAGE_PATH,
  RGB_TO_COLOR_ID,
} from "./const";

type LoadImageOptions = {
  scaleTo?: { width: number; height: number };
  centerImage?: boolean;
  leftPos?: number;
  topPos?: number;
};

export const loadImageDiffBetweenOverlayAndCurrent = async (
  opt: LoadImageOptions = {}
) => {
  let leftPos = opt.leftPos || 0;
  let topPos = opt.topPos || 0;
  const currentImage = await Jimp.read(CURRENT_IMAGE_PATH);
  const currentImageWidth = currentImage.getWidth();
  const currentImageHeight = currentImage.getHeight();

  const overlayImage = await Jimp.read(OVERLAY_IMAGE_PATH);
  const overlayImageWidth = overlayImage.getWidth();
  const overlayImageHeight = overlayImage.getHeight();

  if (opt.centerImage) {
    leftPos = (currentImageWidth - overlayImageWidth) / 2;
    topPos = (currentImageHeight - overlayImageHeight) / 2;
  }

  const toDraw: XYC[] = [];
  const diffImage = currentImage.clone();

  for (let x = 0; x < overlayImageWidth; x++) {
    for (let y = 0; y < overlayImageHeight; y++) {
      const overlayImageColor = overlayImage.getPixelColor(x, y);
      const overlayImageRgba = Jimp.intToRGBA(overlayImageColor);

      const currentImageColor = currentImage.getPixelColor(
        x + leftPos,
        y + topPos
      );
      const currentImageRgba = Jimp.intToRGBA(currentImageColor);

      // filter out unchanged pixels
      if (
        overlayImageRgba.r != currentImageRgba.r ||
        overlayImageRgba.g != currentImageRgba.g ||
        overlayImageRgba.b != currentImageRgba.b ||
        overlayImageRgba.a != currentImageRgba.a
      ) {
        diffImage.setPixelColor(overlayImageColor, x, y);
        let colorID =
          RGB_TO_COLOR_ID[
            `${overlayImageRgba.r}-${overlayImageRgba.g}-${overlayImageRgba.b}`
          ];
        if (colorID == undefined) {
          //   console.log(
          //     `colorID is undefined for ${JSON.stringify(
          //       overlayImageRgba,
          //       null,
          //       2
          //     )}, default to 1 (white)`
          //   );
          colorID = 1;
        }
        toDraw.push({ c: colorID, x: x + leftPos, y: y + topPos });
      }
    }
  }

  console.log(
    "Filtered existing pixels from",
    currentImageWidth * currentImageHeight,
    "to",
    toDraw.length
  );

  // write the image to a file
  const previewPath = "./preview/canvas_preview.png";
  await diffImage.writeAsync(previewPath);
  return toDraw;
};
