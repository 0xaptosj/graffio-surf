# surf script for graffio

## Setup

```
npm i
cp .env.example .env
```

If you update the graffio contract, run below to generate abi.

```
npm run gen-abi
```

After you setup `.env` and `const.ts` accordingly, you can run scripts like below, and you can find all available scripts in `package.json`.

```
npm run optimized-add-to-unlimited-artists
```

There is a special draw overlay scripts that can reset current canvas to a previous snapshot, or place a small image at certain position of the current image to cover something you don't like. Make sure you copy both images to `img` and update the path in `const.ts`.

```
npm run overlay-draw
```

You can specify the top left corner if you are placing a small image on top of current like this, left pos is 50, top pos is 100.

```
npm run overlay-draw -- "img/current_image.png" "img/pepe.png" 250 100
```
