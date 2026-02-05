import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Example dummy data (replace this with real data fetch logic)
  res.status(200).json([
    {
      protocol: 'Aave',
      chain: 'Ethereum',
      asset: 'USDC',
      apy: 4.27,
      tvl_usd: 15820000
    },
    {
      protocol: 'Compound',
      chain: 'Ethereum',
      asset: 'USDT',
      apy: 3.65,
      tvl_usd: 10983500
    }
  ]);
}