export async function POST(req) {
  const body = await req.json();

  const res = await fetch(
    "https://codesage-ai-code-analyzer-909292301.development.catalystserverless.com/server/versions",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
