"use client";

import React from "react";
import { HandCard } from "../hand-drawn/HandCard";
import { HandBadge } from "../hand-drawn/HandBadge";
import { DrawnScribble } from "../hand-drawn/DrawnDecorations";

export interface SkillItem {
  readonly name: string;
  readonly level: string;
  readonly detail: string;
  readonly tools: readonly string[];
}

interface SkillsSectionProps {
  skills: readonly SkillItem[];
  activeSkill: number;
  onSelectSkill: (index: number) => void;
}

export function SkillsSection({
  skills,
  activeSkill,
  onSelectSkill,
}: SkillsSectionProps) {
  const current = skills[activeSkill];

  return (
    <section className="hand-section" id="stack" data-nav="STACK">
      <div className="hand-container">
        <div className="section-label-hand">02 / SKILL TREE & TOOLKIT</div>
        <h2 className="section-marker-title">
          TECHNICAL TOOLKIT
          <DrawnScribble type="underline" color="var(--accent-pen)" />
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            marginTop: "1.75rem",
          }}
          className="skills-grid-responsive"
        >
          {/* Skill List Tabs */}
          <div
            role="tablist"
            aria-label="Skill areas"
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            {skills.map((skill, index) => {
              const isSelected = activeSkill === index;
              return (
                <button
                  key={skill.name}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectSkill(index)}
                  className="hand-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.9rem 1.25rem",
                    cursor: "pointer",
                    textAlign: "left",
                    backgroundColor: isSelected ? "var(--postit-yellow)" : "var(--card-bg)",
                    borderWidth: isSelected ? "3px" : "2px",
                    borderColor: isSelected ? "var(--accent-marker)" : "var(--border-pencil)",
                    transform: isSelected ? "scale(1.02) rotate(-0.5deg)" : "none",
                    boxShadow: isSelected
                      ? "4px 4px 0px 0px var(--accent-marker)"
                      : "var(--shadow-hard-sm)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        color: isSelected ? "var(--accent-marker)" : "#888",
                        fontWeight: "bold",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.3rem",
                        color: "var(--fg-pencil)",
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>

                  <HandBadge
                    variant={
                      skill.level === "CORE"
                        ? "marker"
                        : skill.level === "STRONG"
                          ? "pen"
                          : "default"
                    }
                    dashed={skill.level === "EXPLORING"}
                    style={{ fontSize: "0.9rem" }}
                  >
                    {skill.level}
                  </HandBadge>
                </button>
              );
            })}
          </div>

          {/* Skill Detail Card */}
          <HandCard
            variant="paper"
            decoration="tape"
            tilt="right-sm"
            role="tabpanel"
            aria-label={`${current.name} details`}
            style={{
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.1rem",
                    color: "var(--accent-pen)",
                  }}
                >
                  NOTEBOOK_ENTRY #{String(activeSkill + 1).padStart(2, "0")}
                </span>

                <span
                  className={
                    current.level === "CORE"
                      ? "hand-stamp"
                      : "hand-stamp hand-stamp-green"
                  }
                >
                  {current.level} MASTERY
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  color: "var(--fg-pencil)",
                  marginBottom: "1rem",
                }}
              >
                {current.name}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.4rem",
                  lineHeight: 1.6,
                  color: "#333",
                  marginBottom: "2rem",
                }}
              >
                {current.detail}
              </p>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.15rem",
                  color: "#666",
                  marginBottom: "0.75rem",
                }}
              >
                KEY TOOLS & PRACTICES:
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {current.tools.map((tool) => (
                  <HandBadge
                    key={tool}
                    variant="yellow"
                    style={{
                      fontSize: "1.1rem",
                      padding: "0.35rem 0.85rem",
                    }}
                  >
                    ✎ {tool}
                  </HandBadge>
                ))}
              </div>
            </div>
          </HandCard>
        </div>
      </div>
    </section>
  );
}
