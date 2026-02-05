import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // No DB or live fetch available
    return res.status(200).json({ source: 'none', count: 0, data: [] });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'failed' });
  }
}
