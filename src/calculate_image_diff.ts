import Jimp from "jimp";
import { RGBA, RGBAXY, XYC } from "./types";
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
          // find closest color
          colorID = findClosestColor(overlayImageRgba);
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

const findClosestColor = (rgba: RGBA) => {
  const { r, g, b } = rgba;
  const colorIDs = Object.keys(RGB_TO_COLOR_ID);
  let minDistance = Number.MAX_SAFE_INTEGER;
  let closestColorID = 0;
  for (let i = 0; i < colorIDs.length; i++) {
    const colorID = parseInt(colorIDs[i]);
    const color = RGB_TO_COLOR_ID[colorID];
    const distance = Math.sqrt(
      Math.pow(r - color.r, 2) +
        Math.pow(g - color.g, 2) +
        Math.pow(b - color.b, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestColorID = colorID;
    }
  }
  return closestColorID;
};
