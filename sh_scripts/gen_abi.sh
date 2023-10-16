#! /bin/bash

NETWORK=mainnet
CANVAS_CONTRACT_ADDR=0x915efe6647e0440f927d46e39bcb5eb040a7e567e1756e002073bc6e26f2cd23

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$CANVAS_CONTRACT_ADDR/module/canvas_token | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/abi/canvas_token_abi.ts
