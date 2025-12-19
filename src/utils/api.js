const BASE_URL =
  "https://codesage-ai-code-analyzer-909292301.development.catalystserverless.com";

/* =========================
   ANALYZE
========================= */
export async function analyzeCode(code) {
  const res = await fetch(`${BASE_URL}/analyze_code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

/* =========================
   SAVE VERSION
========================= */
export async function saveVersion({ code, analysis }) {
  const res = await fetch(`${BASE_URL}/server/versions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      analysis,
    }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

/* =========================
   GET VERSION HISTORY
========================= */
export async function getVersionHistory() {
  const res = await fetch(`${BASE_URL}/server/versions`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json(); // { versions: [...] }
}

