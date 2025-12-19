const ANALYZE_URL =
  "https://codesage-ai-code-analyzer-909292301.development.catalystserverless.com/server/analyze/";

const VERSIONS_URL =
  "https://codesage-ai-code-analyzer-909292301.development.catalystserverless.com/server/versions";


// =======================
// ANALYZE CODE
// =======================
export async function analyzeCode(code) {
  const res = await fetch(ANALYZE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) throw new Error("Analyze failed");
  return await res.json();
}

// SESSION_ID
export const sessionId =
  localStorage.getItem("codesage_session") ??
  (() => {
    const id = crypto.randomUUID();
    localStorage.setItem("codesage_session", id);
    return id;
  })();


// =======================
// VERSION HISTORY (GET)
// =======================
export async function getVersionHistory() {
  const res = await fetch(`${VERSIONS_URL}/${sessionId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.history ?? [];
}


// =======================
// SAVE VERSION (POST)
// =======================
export async function saveVersion(snapshot) {
  const res = await fetch(`${VERSIONS_URL}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      ...snapshot,
    }),
  });

  if (!res.ok) throw new Error("Save version failed");
  return res.json();
}




