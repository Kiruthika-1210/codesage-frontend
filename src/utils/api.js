const BASE_URL =
  "https://codesage-ai-code-analyzer-909292301.development.catalystserverless.com";

// ---------- ANALYZE ----------
export async function analyzeCode(code) {
  const res = await fetch(`${BASE_URL}/server/analyze/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Analyze failed: " + text);
  }

  return res.json();
}

// ---------- VERSION HISTORY ----------
export async function getVersionHistory() {
  const res = await fetch(`${BASE_URL}/server/versions`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Get versions failed: " + text);
  }

  return res.json(); // { versions: [...] }
}

// ---------- SAVE VERSION ----------
export async function saveVersion(snapshot) {
  const res = await fetch(`${BASE_URL}/server/versions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snapshot),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Save version failed: " + text);
  }

  return res.json();
}
