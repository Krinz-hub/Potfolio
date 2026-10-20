"use client";

import React from "react";
import { HandCard } from "../hand-drawn/HandCard";
import { HandButton } from "../hand-drawn/HandButton";
import { HandBadge } from "../hand-drawn/HandBadge";
import { DrawnScribble } from "../hand-drawn/DrawnDecorations";

export type ExperimentItem = readonly [string, string, string];

interface LabSectionProps {
  experiments: readonly ExperimentItem[];
  activeLab: ExperimentItem | null;
  onOpenLab: (item: ExperimentItem) => void;
  onCloseLab: () => void;
}

export function LabSection({
  experiments,
  activeLab,
  onOpenLab,
  onCloseLab,
}: LabSectionProps) {
  const decorations: ("tack" | "tape" | "tape-corner")[] = [
    "tack",
    "tape",
    "tape-corner",
    "tack",
  ];
  const tilts: ("left-sm" | "right-sm" | "left-md" | "right-md")[] = [
    "left-sm",
    "right-sm",
    "left-md",
    "right-sm",
  ];

  return (
    <section className="hand-section" id="lab" data-nav="LAB">
      <div className="hand-container">
        <div className="section-label-hand">06 / EXPERIMENT LAB & SKETCHES</div>
        <h2 className="section-marker-title">
          SMALL, WEIRD & CURIOUS IDEAS
          <DrawnScribble type="underline" color="var(--accent-marker)" />
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.45rem",
            color: "#444",
            maxWidth: "750px",
            marginBottom: "2.5rem",
          }}
        >
          A space for playful tests, micro-automations, useful prototypes, and
          sketches that don&apos;t fit neatly into a corporate project brief.
        </p>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem",
          }}
        >
          {experiments.map((experiment, index) => {
            const [num, title, desc] = experiment;
            return (
              <HandCard
                key={num}
                variant="paper"
                decoration={decorations[index % decorations.length]}
                tilt={tilts[index % tilts.length]}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1.75rem",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <HandBadge variant="pen" style={{ fontSize: "0.85rem" }}>
                      #{num}
                    </HandBadge>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.95rem",
                        color: "#888",
                      }}
                    >
                      LAB NOTE
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.65rem",
                      color: "var(--fg-pencil)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1.25rem",
                      lineHeight: 1.5,
                      color: "#444",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {desc}
                  </p>
                </div>

                <HandButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onOpenLab(experiment)}
                  aria-label={`Open log for ${title}`}
                >
                  OPEN SKETCH LOG ↗
                </HandButton>
              </HandCard>
            );
          })}
        </div>
      </div>

      {/* Lab Modal Dialog */}
      {activeLab && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lab-modal-title"
          onClick={onCloseLab}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(45, 45, 45, 0.45)",
            backdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "520px",
              width: "100%",
            }}
          >
            <HandCard
              variant="postit"
              decoration="tape"
              tilt="none"
              style={{
                padding: "2rem",
                boxShadow: "var(--shadow-hard-lg)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <HandBadge variant="marker">EXPERIMENT #{activeLab[0]}</HandBadge>
                <button
                  onClick={onCloseLab}
                  className="hand-btn hand-btn-sm"
                  aria-label="Close experiment dialog"
                  style={{ padding: "0.2rem 0.6rem" }}
                >
                  ✕
                </button>
              </div>

              <h3
                id="lab-modal-title"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2rem",
                  color: "var(--fg-pencil)",
                  marginBottom: "0.75rem",
                }}
              >
                {activeLab[1]}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.4rem",
                  lineHeight: 1.6,
                  color: "#333",
                  marginBottom: "1rem",
                }}
              >
                {activeLab[2]}
              </p>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "2px dashed var(--border-pencil)",
                  borderRadius: "var(--radius-wobbly)",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.2rem",
                  color: "#555",
                }}
              >
                ✎ Note: This is an active laboratory prototype. When new findings or code
                demos are ready, they will be documented here directly from the lab.
              </div>

              <HandButton variant="primary" size="md" onClick={onCloseLab}>
                CLOSE SKETCH LOG
              </HandButton>
            </HandCard>
          </div>
        </div>
      )}
    </section>
  );
}
