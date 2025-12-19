const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// =======================
// ANALYZE CODE
// =======================
export async function analyzeCode(code) {
  const res = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    throw new Error("Analyze failed");
  }

  return await res.json();
}

// =======================
// VERSION HISTORY (GET)
// =======================
export async function getVersionHistory() {
  const res = await fetch(`${BASE_URL}/versions`, {
    method: "GET",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.versions ?? [];
}

// =======================
// SAVE VERSION (POST)
// =======================
export async function saveVersion({ code, analysis }) {
  const res = await fetch(`${BASE_URL}/versions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, analysis }),
  });

  if (!res.ok) {
    throw new Error("Save version failed");
  }

  return await res.json();
}
