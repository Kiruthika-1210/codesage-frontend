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

  const [code, setCode] = useState("");
  const [issues, setIssues] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [complexity, setComplexity] = useState(null);
  const [scores, setScores] = useState(null);
  const [versionHistory, setVersionHistory] = useState([]);

  const issuesRef = useRef(null);

  const isCodeEmpty = !code || code.trim() === "";
  const canSaveVersion = !isCodeEmpty && (issues.length > 0 || scores);

  useEffect(() => {
    getVersionHistory()
      .then(setVersionHistory)
      .catch(console.error);
  }, []);

  async function handleAnalyze() {
    if (isCodeEmpty) {
      setIssues([]);
      setComplexity(null);
      setScores(null);
      return;
    }

    const result = await analyzeCode(code);

    setIssues(result.issues);

    const c = result.complexity;
    setComplexity({
      nestingDepth: c.nesting?.max_nesting_depth ?? "—",
      loopDepth: c.loops?.max_loop_depth ?? "—",
      bigO: c.big_o ?? "—",
      score: c.score ?? 0,
      patterns: c.loops?.nested_loops_detected ? ["Nested Loops"] : [],
    });

    setScores(result.scores);

    setTimeout(() => {
      issuesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  async function handleSaveVersion() {
    await saveVersion({
      code,
      analysis: {
        issues,
        complexity,
        quality_score: scores.qualityScore
      }
    });

    const history = await getVersionHistory();
    setVersionHistory(history);
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950
                    text-neutral-900 dark:text-neutral-100 transition-colors">

      <div className="mx-auto max-w-6xl px-6 py-8 space-y-8">

        <div className="flex justify-end">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1 rounded-lg text-sm font-medium
                       border border-neutral-700 dark:border-neutral-600
                       hover:bg-neutral-200 dark:hover:bg-neutral-800">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <CodeEditor
          code={code}
          onCodeChange={setCode}
          onAnalyze={handleAnalyze}
        />

        <div ref={issuesRef}>
          <IssueList
            issues={issues}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onIssueClick={(line) => console.log("Jump to line:", line)}
          />
        </div>

        {complexity && <ComplexityPanel data={complexity} />}
        {scores && <ScorePanel data={scores} />}

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
