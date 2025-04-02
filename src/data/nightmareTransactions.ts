export type NightmareTransaction = {
  id: string;
  svgId: number;
  correct: string;
  choices: string[];
};

export const nightmareTransactions: NightmareTransaction[] = [
  {
    id: "ntx_1",
    svgId: 1,
    correct: "Send 5,200 DAI to vitalik.eth",
    choices: [
      "Send 5,200 DAI to vitalik.eth",
      "Cancel a pending Safe transaction",
      "Wrap 10 ETH to WETH",
      "Approve transaction batch"
    ]
  },
  {
    id: "ntx_2",
    svgId: 2,
    correct: "Approve unlimited aWETH",
    choices: [
      "Stake USDC in Curve",
      "Approve unlimited aWETH",
      "Withdraw from Yearn Protocol",
      "Send ETH to 0xdead...beef"
    ]
  },
  {
    id: "ntx_3",
    svgId: 3,
    correct: "Withdraw 114.3 WBTC from Aave Protocol V2",
    choices: [
      "Repay 70,000 USDT to Aave V2",
      "Mint POAP",
      "Withdraw 114.3 WBTC from Aave Protocol V2",
      "Wrap WETH"
    ]
  },
  {
    id: "ntx_4",
    svgId: 4,
    correct: "Repay 70,000 USDT to Aave V2",
    choices: [
      "Repay 70,000 USDT to Aave V2",
      "Add liquidity to Curve Pool",
      "Stake ETH for rETH",
      "Swap 100 USDT to DAI"
    ]
  },
  {
    id: "ntx_5",
    svgId: 5,
    correct: "Remove liquidity of 1,884 USDC from Curve Pool",
    choices: [
      "Set new fallback handler in Safe settings",
      "Remove liquidity of 1,884 USDC from Curve Pool",
      "Approve transaction batch",
      "Claim airdrop"
    ]
  }
];
