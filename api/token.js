export default async function handler(req, res) {
  const { agent_id, api_key, customer_number } = req.query;

  if (!agent_id || !api_key || !customer_number) {
    return res.status(400).json({ error: "Missing agent_id, api_key, or customer_number" });
  }

  try {
    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${api_key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        agent_id: agent_id,
        customer_number: customer_number
      })
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Unexpected response: ${text}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



