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
  readonly repoName?: string;
  readonly stars?: number;
  readonly forks?: number;
  readonly language?: string;
  readonly languageColor?: string;
  readonly isPinned?: boolean;
}

interface ProjectsSectionProps {
  projects: readonly ProjectItem[];
  activeProject: number;
  isTransitioning: boolean;
  onSelectProject: (index: number) => void;
  isSyncing?: boolean;
  lastSyncedText?: string;
  onRefresh?: () => void;
  githubUsername?: string;
}

export function ProjectsSection({
  projects,
  activeProject,
  isTransitioning,
  onSelectProject,
  isSyncing = false,
  lastSyncedText = "AUTO-SYNCED",
  onRefresh,
  githubUsername = "Krinz-hub",
}: ProjectsSectionProps) {
  const safeIndex =
    projects.length > 0
      ? Math.min(Math.max(0, activeProject), projects.length - 1)
      : 0;
  const current = projects[safeIndex];

  return (
    <section className="hand-section" id="projects" data-nav="PROJECTS">
      <div className="hand-container">
        {/* Section Label */}
        <div className="section-label-hand">03 / SELECTED WORKS & PROTOTYPES</div>
        
        {/* Section Heading */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          <h2 className="section-marker-title" style={{ margin: 0 }}>
            FEATURED PROJECTS
            <DrawnScribble type="underline" color="var(--accent-marker)" />
          </h2>

          {/* GitHub Sync Status Capsule */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              backgroundColor: "var(--card-bg)",
              border: "2px dashed var(--border-pencil)",
              borderRadius: "var(--radius-wobbly)",
              padding: "0.4rem 0.9rem",
              boxShadow: "var(--shadow-hard-sm)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
              <span
                className={isSyncing ? "hand-spin" : "hand-pulse-dot"}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: isSyncing ? "var(--accent-pen)" : "#22c55e",
                  display: "inline-block",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.95rem",
                  color: "var(--fg-pencil)",
                  fontWeight: "bold",
                }}
              >
                {isSyncing ? "SYNCING WITH GITHUB..." : "GITHUB PINNED SYNC"}
              </span>
            </div>

            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "var(--accent-marker)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              @{githubUsername}
            </a>

            {lastSyncedText && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--fg-muted)",
                }}
              >
                • {lastSyncedText}
              </span>
            )}

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={isSyncing}
                title="Force refresh pinned projects directly from GitHub"
                style={{
                  background: isSyncing ? "var(--muted-paper)" : "var(--postit-yellow)",
                  border: "1.5px solid var(--border-pencil)",
                  borderRadius: "4px",
                  padding: "0.15rem 0.55rem",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.85rem",
                  color: "var(--fg-pencil)",
                  cursor: isSyncing ? "wait" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  boxShadow: "1px 1px 0px var(--border-pencil)",
                  transition: "transform 0.1s ease",
                }}
              >
                <span className={isSyncing ? "hand-spin" : ""}>↻</span>
                {isSyncing ? "CHECKING..." : "RE-SYNC"}
              </button>
            )}
          </div>
        </div>

        {/* Small subtitle explaining automatic sync */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
            color: "var(--fg-muted)",
            marginTop: "0.25rem",
            marginBottom: "1.25rem",
          }}
        >
          ✎ Showing live pinned repositories dynamically synced from GitHub. Updates automatically whenever pinned items or repositories change.
        </p>

        {(!projects || projects.length === 0) ? (
          <div
            className="hand-card"
            style={{
              padding: "2.5rem",
              textAlign: "center",
              backgroundColor: "var(--card-bg)",
              border: "2px dashed var(--border-pencil)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.4rem",
                color: "var(--fg-pencil)",
              }}
            >
              ✎ Fetching pinned repositories from GitHub...
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.25rem",
            }}
            className="projects-grid-responsive"
          >
            {/* Project List Selector */}
            <div
              role="tablist"
              aria-label="GitHub pinned projects list"
              style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
            >
              {projects.map((item, index) => {
                const isSelected = safeIndex === index;
                return (
                  <button
                    key={item.id || item.repoName || index}
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
                      backgroundColor: isSelected
                        ? "var(--postit-yellow)"
                        : "var(--card-bg)",
                      borderWidth: isSelected ? "3px" : "2px",
                      borderColor: isSelected
                        ? "var(--accent-marker)"
                        : "var(--border-pencil)",
                      transform: isSelected ? "scale(1.02) rotate(-0.5deg)" : "none",
                      boxShadow: isSelected
                        ? "4px 4px 0px 0px var(--accent-marker)"
                        : "var(--shadow-hard-sm)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: 0 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.1rem",
                          color: isSelected ? "var(--accent-marker)" : "var(--fg-subtle)",
                          fontWeight: "bold",
                        }}
                      >
                        {item.id}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.25rem",
                            color: "var(--fg-pencil)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.9rem",
                            color: "var(--fg-muted)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <span>{item.category.slice(0, 2).join(" • ")}</span>
                          {item.repoName && (
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.8rem",
                                color: "var(--accent-pen)",
                                opacity: 0.85,
                              }}
                            >
                              gh/{item.repoName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexShrink: 0,
                      }}
                    >
                      {typeof item.stars === "number" && item.stars > 0 && (
                        <span
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "0.85rem",
                            color: "var(--accent-marker)",
                            backgroundColor: "var(--tag-marker-bg)",
                            padding: "0.15rem 0.45rem",
                            borderRadius: "4px",
                          }}
                        >
                          ★ {item.stars}
                        </span>
                      )}

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
                          color: isSelected ? "var(--accent-marker)" : "var(--fg-subtle)",
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
            {current && (
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
                    marginBottom: "0.85rem",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        color: "var(--accent-pen)",
                      }}
                    >
                      SPECIFICATION #{current.id}
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.85rem",
                        backgroundColor: "var(--postit-yellow)",
                        border: "1px dashed var(--border-pencil)",
                        padding: "0.1rem 0.5rem",
                        borderRadius: "3px",
                        color: "var(--fg-pencil)",
                      }}
                    >
                      📌 PINNED ON GITHUB
                    </span>
                  </div>

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

                {/* GitHub Telemetry Strip */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    flexWrap: "wrap",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    color: "var(--fg-muted)",
                    marginBottom: "0.85rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px dashed var(--border-pencil)",
                  }}
                >
                  {current.language && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: current.languageColor || "var(--accent-pen)",
                          display: "inline-block",
                        }}
                      />
                      {current.language}
                    </span>
                  )}

                  {typeof current.stars === "number" && (
                    <span>
                      ★ {current.stars} {current.stars === 1 ? "star" : "stars"}
                    </span>
                  )}

                  {typeof current.forks === "number" && (
                    <span>⑂ {current.forks} forks</span>
                  )}

                  {current.repoName && (
                    <a
                      href={`https://github.com/${githubUsername}/${current.repoName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--accent-pen)",
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                      }}
                    >
                      github.com/{githubUsername}/{current.repoName} ↗
                    </a>
                  )}
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
                    color: "var(--fg-pencil)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {current.description}
                </p>

                {/* Sketched Blueprint Box / Tech Stack Badges */}
                <div
                  style={{
                    border: "2px dashed var(--border-pencil)",
                    borderRadius: "var(--radius-wobbly)",
                    padding: "1.25rem",
                    backgroundColor: "var(--card-tint)",
                    marginBottom: "1.75rem",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.05rem",
                      color: "var(--fg-muted)",
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
                      style={{ opacity: 0.65, cursor: "not-allowed" }}
                    >
                      {current.status === "ACTIVE"
                        ? "LOCAL SYSTEM TOOL"
                        : "DEMO COMING SOON"}
                    </HandButton>
                  )}

                  {current.source && current.source !== "#" ? (
                    <HandButton
                      variant="secondary"
                      href={current.source}
                      external
                      size="md"
                    >
                      VIEW ON GITHUB ↗
                    </HandButton>
                  ) : (
                    <HandButton
                      variant="secondary"
                      size="md"
                      disabled
                      style={{ opacity: 0.65, cursor: "not-allowed" }}
                    >
                      PRIVATE REPOSITORY
                    </HandButton>
                  )}
                </div>
              </HandCard>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
