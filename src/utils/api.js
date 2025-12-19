const BASE_URL =
  "https://codesage-ai-code-analyzer-909292301.development.catalystserverless.com";

// =======================
// ANALYZE CODE
// =======================
export async function analyzeCode(code) {
  const res = await fetch(`${BASE_URL}/server/analyze/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    throw new Error("Analyze failed");
  }

  return res.json();
}

// =======================
// VERSION HISTORY (GET)
// =======================
export async function getVersionHistory() {
  const res = await fetch(`${BASE_URL}/server/versions`);

  if (!res.ok) {
    throw new Error("Failed to fetch version history");
  }

  const data = await res.json();
  return data.versions ?? [];
}

// =======================
// SAVE VERSION (POST)
// =======================
export async function saveVersion(snapshot) {
  const res = await fetch(`${BASE_URL}/server/versions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snapshot),
  });

  if (!res.ok) {
    throw new Error("Save version failed");
  }

  return res.json();
}
