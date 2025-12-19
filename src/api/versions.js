// =======================
// GET VERSION HISTORY
// =======================
export async function GET() {
  try {
    const res = await fetch(
      "https://codesage-ai-code-analyzer-909292301.development.catalystserverless.com/server/versions",
      { method: "GET" }
    );

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}


// =======================
// SAVE VERSION
// =======================
export async function POST(req) {
  try {
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
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
