export default async function handler(req, res) {
  const { agent_id, api_key } = req.query;

  if (!agent_id || !api_key) {
    return res.status(400).json({ error: "Missing agent_id or api_key" });
  }

  try {
    const response = await fetch("https://api.retellai.com/token", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

