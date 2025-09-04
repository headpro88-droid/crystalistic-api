export default function handler(req, res) {
  const SECRET = process.env.API_SECRET; // set in Vercel later
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }
  if (req.query.token !== SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { jobId, bestMps } = req.body;
  if (!jobId || !bestMps) {
    return res.status(400).json({ error: "Missing jobId or bestMps" });
  }

  // store jackpot data in memory
  globalThis._jackpotData = globalThis._jackpotData || {};
  globalThis._jackpotData[jobId] = {
    bestMps,
    updated: Date.now()
  };

  return res.status(200).json({ success: true });
}
