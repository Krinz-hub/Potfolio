"use client";

import React from "react";
import { HandCard } from "../hand-drawn/HandCard";
import { HandButton } from "../hand-drawn/HandButton";
import { HandBadge } from "../hand-drawn/HandBadge";
import { DrawnScribble } from "../hand-drawn/DrawnDecorations";

export interface ProjectItem {
  readonly id: string;
  readonly title: string;
  readonly category: readonly string[];
  readonly status: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly live: string;
  readonly source: string;
  readonly visual: string;
}

interface ProjectsSectionProps {
  projects: readonly ProjectItem[];
  activeProject: number;
  isTransitioning: boolean;
  onSelectProject: (index: number) => void;
}

export function ProjectsSection({
  projects,
  activeProject,
  isTransitioning,
  onSelectProject,
}: ProjectsSectionProps) {
  const current = projects[activeProject];

  return (
    <section className="hand-section" id="projects" data-nav="PROJECTS">
      <div className="hand-container">
        <div className="section-label-hand">03 / SELECTED WORKS & PROTOTYPES</div>
        <h2 className="section-marker-title">
          FEATURED PROJECTS
          <DrawnScribble type="underline" color="var(--accent-marker)" />
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.25rem",
            marginTop: "1.75rem",
          }}
          className="projects-grid-responsive"
        >
          {/* Project List Selector */}
          <div
            role="tablist"
            aria-label="Projects list"
            style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
          >
            {projects.map((item, index) => {
              const isSelected = activeProject === index;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectProject(index)}
                  className="hand-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 1.25rem",
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
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        color: isSelected ? "var(--accent-marker)" : "#888",
                        fontWeight: "bold",
                      }}
                    >
                      {item.id}
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.3rem",
                          color: "var(--fg-pencil)",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.95rem",
                          color: "#666",
                        }}
                      >
                        {item.category.join(" • ")}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <HandBadge
                      variant={
                        item.status === "LIVE"
                          ? "marker"
                          : item.status === "IN BUILD"
                            ? "yellow"
                            : "pen"
                      }
                      style={{ fontSize: "0.85rem" }}
                    >
                      {item.status}
                    </HandBadge>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.2rem",
                        color: isSelected ? "var(--accent-marker)" : "#888",
                      }}
                    >
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Project Showcase Card */}
          <HandCard
            variant="paper"
            decoration="tape"
            tilt="right-sm"
            role="tabpanel"
            aria-label={`${current.title} preview`}
            style={{
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              opacity: isTransitioning ? 0.6 : 1,
              transition: "opacity 0.2s ease, transform var(--snappy)",
            }}
          >
            {/* Top Metadata */}
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
                PROJECT SPECIFICATION #{current.id}
              </span>

              <span
                className={
                  current.status === "LIVE"
                    ? "hand-stamp hand-stamp-green"
                    : "hand-stamp"
                }
              >
                {current.status}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4.5vw, 2.9rem)",
                color: "var(--fg-pencil)",
                marginBottom: "1rem",
              }}
            >
              {current.title}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.35rem",
                lineHeight: 1.6,
                color: "#333",
                marginBottom: "1.5rem",
              }}
            >
              {current.description}
            </p>

            {/* Sketched Blueprint Box / Thumbnail Preview */}
            <div
              style={{
                border: "2px dashed var(--border-pencil)",
                borderRadius: "var(--radius-wobbly)",
                padding: "1.25rem",
                backgroundColor: "#faf7f0",
                marginBottom: "1.75rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.05rem",
                  color: "#666",
                  marginBottom: "0.6rem",
                }}
              >
                TECH STACK BLUEPRINT:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {current.technologies.map((tech, idx) => (
                  <HandBadge
                    key={`${tech}-${idx}`}
                    variant="yellow"
                    style={{ fontSize: "1.05rem" }}
                  >
                    ✎ {tech}
                  </HandBadge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {current.live && current.live !== "#" ? (
                <HandButton
                  variant="primary"
                  href={current.live}
                  external
                  size="md"
                >
                  VIEW LIVE PROJECT ↗
                </HandButton>
              ) : (
                <HandButton
                  variant="primary"
                  size="md"
                  disabled
                  style={{ opacity: 0.6, cursor: "not-allowed" }}
                >
                  DEMO COMING SOON
                </HandButton>
              )}

              {current.source && current.source !== "#" ? (
                <HandButton
                  variant="secondary"
                  href={current.source}
                  external
                  size="md"
                >
                  SOURCE CODE ↗
                </HandButton>
              ) : (
                <HandButton
                  variant="secondary"
                  size="md"
                  disabled
                  style={{ opacity: 0.6, cursor: "not-allowed" }}
                >
                  PRIVATE REPOSITORY
                </HandButton>
              )}
            </div>
          </HandCard>
        </div>
      </div>
    </section>
  );
}
