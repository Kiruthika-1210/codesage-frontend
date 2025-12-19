import { useState, useEffect, useRef } from "react";

import CodeEditor from "../components/CodeEditor";
import IssueList from "../components/IssueList";
import ComplexityPanel from "../components/ComplexityPanel";
import ScorePanel from "../components/ScorePanel";
import VersionHistory from "../components/VersionHistory";

import {
  analyzeCode,
  saveVersion,
  getVersionHistory
} from "../utils/api";

function Home({ theme, setTheme }) {

  /* =======================
     STATE
  ======================= */
  const [code, setCode] = useState("");
  const [issues, setIssues] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [complexity, setComplexity] = useState(null);
  const [scores, setScores] = useState(null);
  const [versionHistory, setVersionHistory] = useState([]);

  const issuesRef = useRef(null);

  const isCodeEmpty = !code || code.trim() === "";
  const canSaveVersion = !isCodeEmpty && (issues.length > 0 || scores);

  /* =======================
     LOAD VERSION HISTORY
  ======================= */
  async function loadHistory() {
    try {
      const res = await getVersionHistory();
      setVersionHistory(res.versions || []);
    } catch (err) {
      console.error("Failed to load version history", err);
      setVersionHistory([]);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  /* =======================
     ANALYZE CODE
  ======================= */
  async function handleAnalyze() {
    if (isCodeEmpty) {
      setIssues([]);
      setComplexity(null);
      setScores(null);
      return;
    }

    try {
      const result = await analyzeCode(code);

      setIssues(result.issues || []);

      const c = result.complexity || {};
      setComplexity({
        nestingDepth: c.nesting?.max_nesting_depth ?? "—",
        loopDepth: c.loops?.max_loop_depth ?? "—",
        bigO: c.big_o ?? "—",
        score: c.score ?? 0,
        patterns: c.loops?.nested_loops_detected
          ? ["Nested Loops"]
          : [],
      });

      setScores(result.scores || null);

      setTimeout(() => {
        issuesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);

    } catch (err) {
      console.error("Analyze failed", err);
    }
  }

  /* =======================
     SAVE VERSION SNAPSHOT
  ======================= */
  async function handleSaveVersion() {
    if (!canSaveVersion) return;

    try {
      await saveVersion({
        code,
        analysis: {
          issues,
          complexity: {
            score: complexity?.score ?? 0,
          },
          quality_score:
            scores?.qualityScore ??
            scores?.finalScore ??
            scores?.score ??
            0,
        },
      });

      await loadHistory();

    } catch (err) {
      console.error("Failed to save version", err);
    }
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950
                    text-neutral-900 dark:text-neutral-100 transition-colors">

      <div className="mx-auto max-w-6xl px-6 py-8 space-y-8">

        {/* THEME TOGGLE */}
        <div className="flex justify-end">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1 rounded-lg text-sm font-medium
                       border border-neutral-700 dark:border-neutral-600
                       hover:bg-neutral-200 dark:hover:bg-neutral-800">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* CODE EDITOR */}
        <CodeEditor
          code={code}
          onCodeChange={setCode}
          onAnalyze={handleAnalyze}
        />

        {/* ISSUES */}
        <div ref={issuesRef}>
          <IssueList
            issues={issues}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onIssueClick={(line) =>
              console.log("Jump to line:", line)
            }
          />
        </div>

        {/* PANELS */}
        {complexity && <ComplexityPanel data={complexity} />}
        {scores && <ScorePanel data={scores} />}

        {/* VERSION HISTORY */}
        <VersionHistory
          versions={versionHistory}
          onSaveVersion={handleSaveVersion}
          canSave={canSaveVersion}
        />

      </div>
    </div>
  );
}

export default Home;
