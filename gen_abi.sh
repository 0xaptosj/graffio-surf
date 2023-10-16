#! /bin/bash

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$CANVAS_CONTRACT_ADDR/module/canvas_token | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/canvas_token_abi.ts
