"use client";

import React from "react";
import { HandCard } from "../hand-drawn/HandCard";
import { HandBadge } from "../hand-drawn/HandBadge";
import { DrawnScribble } from "../hand-drawn/DrawnDecorations";

interface AboutSectionProps {
  statement: string;
  facts: readonly (readonly [string, string])[];
}

export function AboutSection({ statement, facts }: AboutSectionProps) {
  return (
    <section className="hand-section" id="about" data-nav="ABOUT">
      <div className="hand-container">
        {/* Section Label */}
        <div className="section-label-hand">01 / PLAYER PROFILE & PHILOSOPHY</div>
        <h2 className="section-marker-title">
          ABOUT DEV KANSAKAR
          <DrawnScribble type="underline" color="var(--accent-marker)" />
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            marginTop: "1.5rem",
          }}
          className="about-grid-responsive"
        >
          {/* Main Statement Card */}
          <HandCard
            variant="paper"
            decoration="tape"
            tilt="none"
            style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  color: "var(--fg-pencil)",
                  lineHeight: 1.2,
                }}
              >
                <span
                  style={{
                    backgroundColor: "#ffe5e5",
                    padding: "0.1rem 0.5rem",
                    borderRadius: "4px",
                    border: "2px solid var(--accent-marker)",
                  }}
                >
                  BUILDER.
                </span>{" "}
                <span
                  style={{
                    backgroundColor: "#e5efff",
                    padding: "0.1rem 0.5rem",
                    borderRadius: "4px",
                    border: "2px solid var(--accent-pen)",
                  }}
                >
                  EXPERIMENTER.
                </span>{" "}
                <span
                  style={{
                    backgroundColor: "var(--postit-yellow)",
                    padding: "0.1rem 0.5rem",
                    borderRadius: "4px",
                    border: "2px solid #2d2d2d",
                  }}
                >
                  SYSTEM THINKER.
                </span>
              </span>
            </div>

            <p
              className="drop-cap"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.45rem",
                lineHeight: 1.6,
                color: "var(--fg-pencil)",
              }}
            >
              {statement}
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.3rem",
                lineHeight: 1.6,
                color: "#444",
                marginTop: "1rem",
              }}
            >
              I’m deeply fascinated by the intersection where a thoughtfully crafted
              human interface, reliable background automation, and an ambitious idea meet.
              Rather than building bloated or generic tools, I enjoy sketching out lean,
              purposeful systems that actually move projects forward.
            </p>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
                paddingTop: "1rem",
                borderTop: "2px dashed var(--muted-paper)",
              }}
            >
              <HandBadge variant="marker">✎ Purpose-driven</HandBadge>
              <HandBadge variant="pen">✎ Human-centered</HandBadge>
              <HandBadge variant="yellow">✎ No cookie-cutter templates</HandBadge>
            </div>
          </HandCard>

          {/* 4 Post-It Notes for Facts */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.6rem",
                marginBottom: "1rem",
                color: "var(--accent-pen)",
              }}
            >
              QUICK STICKY NOTES:
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {facts.map(([label, value], index) => {
                const tilts: ("left-sm" | "right-sm" | "left-md" | "right-md")[] = [
                  "left-sm",
                  "right-sm",
                  "left-md",
                  "right-md",
                ];
                const decs: ("tape" | "tack")[] = ["tape", "tack", "tape", "tack"];

                return (
                  <HandCard
                    key={label}
                    variant="postit"
                    decoration={decs[index % decs.length]}
                    tilt={tilts[index % tilts.length]}
                    style={{ padding: "1.25rem" }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1rem",
                        color: "var(--accent-marker)",
                        letterSpacing: "0.05em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.45rem",
                        fontWeight: 700,
                        color: "var(--fg-pencil)",
                      }}
                    >
                      {value}
                    </div>
                  </HandCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
