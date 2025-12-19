import React, { useState } from "react";

function VersionHistory({ versions, onSaveVersion, canSave }) {
  const [selectedVersion, setSelectedVersion] = useState(null);

  return (
    <div className="mt-8 p-6 rounded-2xl bg-[#0d0d0f] border border-[#1a1a1d] shadow-xl text-white">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-[#d4a44d]">
          Version History
          <span className="px-2 py-0.5 rounded-full text-xs bg-[#1a1a1d] border border-[#262629] text-gray-300">
            {versions.length}
          </span>
        </h2>

        <button
          onClick={onSaveVersion}
          disabled={!canSave}
          title="Save current analyzed code as a new snapshot"
          className={`px-4 py-1 rounded-lg text-sm font-medium transition
            ${
              canSave
                ? "text-black bg-yellow-500 hover:bg-yellow-400"
                : "bg-neutral-700 text-neutral-400 cursor-not-allowed"
            }`}
        >
          Save Snapshot
        </button>
      </div>

      {/* ================= TIMELINE ================= */}
      {versions.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No versions saved yet.
        </p>
      ) : (
        <div className="space-y-4">
          {versions.map((version, index) => (
            <div
              key={version.version_id}
              className="flex justify-between items-center p-4 rounded-xl
                         bg-[#101012] border border-[#1f1f22]"
            >
              <div>
                <p className="font-medium text-gray-200">
                  v{versions.length - index}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(version.created_time).toLocaleString()}
                </p>

                {version.regression && (
                  <p className="text-sm text-red-400 mt-1">
                    ⚠ {version.regression_reason || "Regression detected"}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedVersion(version)}
                className="px-4 py-1 rounded-lg text-sm font-medium
                           text-[#d4a44d] border border-[#d4a44d]/60
                           hover:bg-black transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selectedVersion && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            className="w-[90%] max-w-3xl bg-[#0d0d0f]
                       border border-[#1a1a1d]
                       rounded-2xl shadow-2xl
                       max-h-[80vh] flex flex-col"
          >

            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#1a1a1d]">
              <h3 className="text-lg font-semibold text-[#d4a44d]">
                Version Details
              </h3>
              <button
                onClick={() => setSelectedVersion(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 overflow-y-auto">

              {/* Snapshot Summary */}
              <div className="mb-4">
                <p className="text-gray-400 mb-1">Snapshot Summary</p>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Quality Score: {selectedVersion.quality_score}</p>
                  <p>Complexity Score: {selectedVersion.complexity_score}</p>
                  <p>Issues Found: {selectedVersion.issue_count}</p>
                </div>
              </div>

              {/* Diff */}
              <div>
                <p className="text-gray-400 mb-1">Diff</p>
                <pre
                  className="bg-[#101012] border border-[#1f1f22]
                             rounded-lg p-4 text-sm text-gray-300
                             max-h-[300px] overflow-y-auto"
                >
{selectedVersion.diff || "No changes detected"}
                </pre>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VersionHistory;
