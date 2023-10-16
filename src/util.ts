import Jimp from "jimp";
import { AptosAccount, AptosClient, BCS, CoinClient, HexString } from "aptos";
import { API_GATEWAY_URL, API_TOKEN } from "./const";

export const getAptosAccountFromPrivateKey = (privateKey: string) => {
  return new AptosAccount(new HexString(privateKey).toUint8Array());
};

export const getAptosClient = () => {
  return new AptosClient(API_GATEWAY_URL, {
    HEADERS: {
      authorization: `Bearer ${API_TOKEN}`,
    },
  });
};

export const getAptosAccount = (privateKey: string) => {
  return new AptosAccount(new HexString(privateKey).toUint8Array());
};

export const getCoinClient = () => {
  return new CoinClient(getAptosClient());
};

export const getSequenceNumber = async (account: AptosAccount) => {
  const { sequence_number: sequenceNumber } = await getAptosClient().getAccount(
    account.address()
  );
  return sequenceNumber;
};

import { TxnBuilderTypes } from "aptos";

export type RGB = { r: number; g: number; b: number };
export type RGBA = RGB & { a: number };
export type RGBAXY = RGBA & { x: number; y: number };

export const {
  AccountAddress,
  ChainId,
  EntryFunction,
  RawTransaction,
  TransactionPayloadEntryFunction,
} = TxnBuilderTypes;

type LoadImageOptions = {
  scaleTo?: { width: number; height: number };
  centerImage?: boolean;
};

export const loadImageDiffBetweenOverlayAndCurrent = async (
  currentImgPath: string,
  overlayImagePath: string,
  opt: LoadImageOptions = {},
  leftPos: number,
  topPos: number
) => {
  const currentImage = await Jimp.read(currentImgPath);
  const currentImageWidth = currentImage.getWidth();
  const currentImageHeight = currentImage.getHeight();

  const overlayImage = await Jimp.read(overlayImagePath);
  const overlayImageWidth = overlayImage.getWidth();
  const overlayImageHeight = overlayImage.getHeight();

  if (opt.centerImage) {
    leftPos = (currentImageWidth - overlayImageWidth) / 2;
    topPos = (currentImageHeight - overlayImageHeight) / 2;
  }

  const toDraw: RGBAXY[] = [];
  const diffImage = currentImage.clone();

  for (let x = leftPos; x < overlayImageWidth; x++) {
    for (let y = topPos; y < overlayImageHeight; y++) {
      const overlayImageColor = overlayImage.getPixelColor(x, y);
      const overlayImageRgba = Jimp.intToRGBA(overlayImageColor);

      const currentImageColor = currentImage.getPixelColor(x, y);
      const currentImageRgba = Jimp.intToRGBA(currentImageColor);

      // filter out unchanged pixels
      if (
        overlayImageRgba.r != currentImageRgba.r ||
        overlayImageRgba.g != currentImageRgba.g ||
        overlayImageRgba.b != currentImageRgba.b ||
        overlayImageRgba.a != currentImageRgba.a
      ) {
        diffImage.setPixelColor(overlayImageColor, x, y);
        toDraw.push({ ...overlayImageRgba, x, y });
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

export const serializeVectorU64 = (arr: Array<number>) => {
  const serializer = new BCS.Serializer();
  serializer.serializeU32AsUleb128(arr.length);
  arr.forEach((arg) => serializer.serializeU64(arg));
  return serializer.getBytes();
};

export const serializeVectorU8 = (arr: Array<number>) => {
  const serializer = new BCS.Serializer();
  serializer.serializeU32AsUleb128(arr.length);
  arr.forEach((arg) => serializer.serializeU8(arg));
  return serializer.getBytes();
};
