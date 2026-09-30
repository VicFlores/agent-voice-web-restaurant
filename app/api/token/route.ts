// Entrega al navegador un token temporal de conversación.
// La API key nunca sale del servidor.

export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return Response.json(
      { error: "Faltan ELEVENLABS_API_KEY o ELEVENLABS_AGENT_ID en .env.local" },
      { status: 500 },
    );
  }

  const res = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`,
    { headers: { "xi-api-key": apiKey }, cache: "no-store" },
  );

  if (!res.ok) {
    const detail = await res.text();
    console.error("ElevenLabs token error", res.status, detail);
    return Response.json(
      { error: `ElevenLabs respondió ${res.status}. Revisa tu API key y Agent ID.` },
      { status: 502 },
    );
  }

  const { token } = (await res.json()) as { token: string };
  return Response.json({ token });
}
