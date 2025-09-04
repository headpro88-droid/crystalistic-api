export default function handler(req, res) {
  const SECRET = process.env.API_SECRET; // same secret key check
  if (req.query.token !== SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const min = parseInt(req.query.min || "0", 10);
  const data = globalThis._jackpotData || {};

  const results = Object.entries(data)
    .filter(([_, entry]) => entry.bestMps >= min)
    .map(([jobId, entry]) => ({
      jobId,
      bestMps: entry.bestMps,
      updated: entry.updated
    }));

  res.status(200).json({ servers: results });
}
