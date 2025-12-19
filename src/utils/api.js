// -------- ANALYZE CODE --------
export async function analyzeCode(code) {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    throw new Error("Analyze failed");
  }

  return res.json();
}

// -------- VERSION HISTORY (GET) --------
export async function getVersionHistory() {
  const res = await fetch("/api/versions");

  if (!res.ok) {
    throw new Error("Failed to fetch version history");
  }

  const data = await res.json();
  return data.versions ?? [];
}

// -------- SAVE VERSION (POST) --------
export async function saveVersion(snapshot) {
  const res = await fetch("/api/versions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snapshot),
  });

  if (!res.ok) {
    throw new Error("Save version failed");
  }

  return res.json();
}
