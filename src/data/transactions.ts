export type Transaction = {
    id: string;
    svgId: number;
    correct: string;
    choices: string[];
  };
  
  export const transactions: Transaction[] = [
    {
      id: "tx_1",
      svgId: 1,
      correct: "Send 5200 DAI to vitalik.eth",
      choices: [
        "Send 5200 DAI to vitalik.eth",
        "Stake 5200 ETH in Lido",
        "Transfer 0.5 WBTC to Aave",
        "Mint a new NFT"
      ]
    },
    {
      id: "tx_2",
      svgId: 2,
      correct: "Approve unlimited aWETH",
      choices: [
        "Send 3 ETH to OpenSea",
        "Approve unlimited aWETH",
        "Swap USDC for ETH on Uniswap",
        "Burn tokens"
      ]
    },
    {
      id: "tx_3",
      svgId: 3,
      correct: "Withdraw 114.3 WBTC from Aave Protocol V2",
      choices: [
        "Withdraw 114.3 WBTC from Aave Protocol V2",
        "Stake 114.3 WBTC in Curve",
        "Repay 70,000 USDT to Aave V2",
        "Send 1 ETH to Binance"
      ]
    },
    {
      id: "tx_4",
      svgId: 4,
      correct: "Repay 70,000 USDT to Aave V2",
      choices: [
        "Withdraw 70,000 USDT from Compound",
        "Repay 70,000 USDT to Aave V2",
        "Send 70,000 DAI to Maker",
        "Deposit 70,000 USDT in Lido"
      ]
    },
    {
      id: "tx_5",
      svgId: 5,
      correct: "Remove liquidity of 1,884 USDC from Curve Pool",
      choices: [
        "Swap 1,884 USDC for ETH",
        "Provide liquidity of 1,884 USDC to Uniswap",
        "Remove liquidity of 1,884 USDC from Curve Pool",
        "Send 1,884 USDC to Coinbase"
      ]
    }
  ];  