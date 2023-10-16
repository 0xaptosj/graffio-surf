#! /bin/bash

NETWORK=testnet

CANVAS_CONTRACT_ADDR=0xcdb9a7ad4b0433b43b2accccf512b62a9781bc3b96a1b1dabd3be2a7f1a974a7

echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$CANVAS_CONTRACT_ADDR/module/canvas_token | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > src/abi/canvas_token_optimized_version_abi.ts
