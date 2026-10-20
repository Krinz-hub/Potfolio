"use client";

import React from "react";
import { HandCard } from "../hand-drawn/HandCard";
import { HandBadge } from "../hand-drawn/HandBadge";
import { DrawnScribble } from "../hand-drawn/DrawnDecorations";

interface BuildLogSectionProps {
  terminalLines: number;
}

export function BuildLogSection({ terminalLines }: BuildLogSectionProps) {
  const logSteps = [
    "✎ Initializing systems & environment variables...",
    "✎ Wiring up modern Next.js 16 + React 19 architecture...",
    "✎ Fine-tuning authentic hand-drawn UI tokens & wobbly borders...",
    "✎ Checking responsive layout and accessibility landmarks...",
    "✔ NOTEBOOK SYSTEM OPERATIONAL",
  ];

  return (
    <section className="hand-section" id="log" data-nav="LOG">
      <div className="hand-container">
        <div className="section-label-hand">04 / CURRENTLY SKETCHING & BUILDING</div>
        <h2 className="section-marker-title">
          LIVE WORKBENCH LOG
          <DrawnScribble type="underline" color="var(--accent-pen)" />
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            marginTop: "1.75rem",
          }}
          className="build-grid-responsive"
        >
          {/* Engineering Notebook Page */}
          <HandCard
            variant="paper"
            decoration="tape"
            tilt="none"
            style={{
              padding: "clamp(1.5rem, 3.5vw, 2.5rem)",
              backgroundColor: "#fefdfa",
            }}
          >
            {/* Header bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "2px solid var(--border-pencil)",
                paddingBottom: "0.75rem",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-marker)",
                    border: "1.5px solid var(--border-pencil)",
                  }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "var(--postit-yellow)",
                    border: "1.5px solid var(--border-pencil)",
                  }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#2b825b",
                    border: "1.5px solid var(--border-pencil)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.2rem",
                    marginLeft: "0.5rem",
                    color: "var(--fg-pencil)",
                  }}
                >
                  WORKBENCH_LOG.MD
                </span>
              </div>

              <HandBadge variant="yellow" style={{ fontSize: "0.95rem" }}>
                STATUS: IN ACTIVE BUILD
              </HandBadge>
            </div>

            {/* Ruled lines with interactive entries */}
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.3rem",
                lineHeight: "2rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: "0.5rem 1rem",
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px dashed var(--muted-paper)",
                }}
              >
                <span style={{ fontFamily: "var(--font-heading)", color: "#777" }}>
                  CURRENT FOCUS:
                </span>
                <span style={{ fontWeight: "bold", color: "var(--fg-pencil)" }}>
                  AI Workflows, APIs & Polished Web Systems
                </span>

                <span style={{ fontFamily: "var(--font-heading)", color: "#777" }}>
                  PROGRESS:
                </span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-marker)" }}>
                  [████████░░] 80% COMPLETE
                </span>
              </div>

              {/* Step lines */}
              <div
                style={{
                  backgroundColor: "#f7f4ec",
                  border: "2px dashed var(--border-pencil)",
                  borderRadius: "var(--radius-wobbly)",
                  padding: "1rem 1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.1rem",
                    color: "var(--accent-pen)",
                    marginBottom: "0.5rem",
                  }}
                >
                  TERMINAL STEPS EXECUTED:
                </div>
                {logSteps.slice(0, Math.max(1, terminalLines)).map((line, idx) => (
                  <div
                    key={line}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.05rem",
                      color: idx === logSteps.length - 1 ? "#2b825b" : "var(--fg-pencil)",
                      fontWeight: idx === logSteps.length - 1 ? "bold" : "normal",
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Bullet notes */}
              <div style={{ marginTop: "1rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.15rem",
                    color: "var(--accent-marker)",
                  }}
                >
                  RECENT FIELD NOTES:
                </span>
                <ul
                  style={{
                    marginTop: "0.5rem",
                    paddingLeft: "1.5rem",
                    fontSize: "1.25rem",
                  }}
                >
                  <li>Documenting end-to-end automation pipelines for modern teams.</li>
                  <li>Refining responsive design systems with zero bloat and high character.</li>
                  <li>Testing local AI agent loops for repeatable coding assistance.</li>
                </ul>
              </div>
            </div>
          </HandCard>
        </div>
      </div>
    </section>
  );
}
