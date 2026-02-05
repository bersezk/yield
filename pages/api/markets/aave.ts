import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchAaveReserves } from '../../../lib/aave';
import { query as dbQuery } from '../../../lib/db';
import dotenv from 'dotenv';
dotenv.config();

async function fetchFromDb() {
  const res = await dbQuery(
    `SELECT m.id, m.protocol_id, p.name as protocol_name, m.chain, m.market_id, m.symbol, m.tvl_usd, m.apr, m.apy, m.metadata,
      (SELECT ts FROM snapshots WHERE market_id = m.id ORDER BY ts DESC LIMIT 1) as snapshot_ts
     FROM markets m
     JOIN protocols p on p.id = m.protocol_id
     WHERE p.name = $1
     ORDER BY m.apy DESC
     LIMIT 200`,
    ['Aave']
  );
  return res.rows;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Try DB first
    if (process.env.DATABASE_URL) {
      const dbRows = await fetchFromDb();
      if (dbRows && dbRows.length > 0) {
        return res.status(200).json({ source: 'db', count: dbRows.length, data: dbRows });
      }
    }

    // Fallback to live fetch
    const data = await fetchAaveReserves();
    return res.status(200).json({ source: 'live', count: data.length, data });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'failed' });
  }
}