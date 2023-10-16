#! /bin/bash

NETWORK=mainnet
CANVAS_CONTRACT_ADDR=0x0bf59936bba20c6cfc14f2465ec7f7645b43c935c539d9de187fe2a7c859062e

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$CANVAS_CONTRACT_ADDR/module/canvas_token | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/abi/canvas_token_abi.ts
