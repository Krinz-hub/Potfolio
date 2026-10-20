"use client";

import React from "react";
import { HandButton } from "../hand-drawn/HandButton";
import { HandCard } from "../hand-drawn/HandCard";
import { HandBadge } from "../hand-drawn/HandBadge";
import { DrawnArrow, TapeDecoration } from "../hand-drawn/DrawnDecorations";

interface HeroSectionProps {
  name: string;
  role: string;
  location: string;
  onExploreClick: () => void;
}

export function HeroSection({
  name,
  role,
  location,
  onExploreClick,
}: HeroSectionProps) {
  return (
    <section className="hand-section" id="top" style={{ paddingTop: "2.5rem" }}>
      <div className="hand-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            alignItems: "center",
          }}
          className="hero-grid-responsive"
        >
          {/* Left Column: Headlines & Callouts */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <HandBadge variant="marker" tilt="left">
                ✎ SKETCHPAD & NOTEBOOK
              </HandBadge>
              <HandBadge variant="yellow" dashed>
                PLAYER 01
              </HandBadge>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.75rem, 7.5vw, 5.25rem)",
                lineHeight: 1.05,
                marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ display: "block" }}>DEV</span>
              <span
                style={{
                  display: "block",
                  color: "var(--accent-pen)",
                  marginLeft: "clamp(0.5rem, 3vw, 2rem)",
                }}
              >
                KANSAKAR
              </span>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)",
                lineHeight: 1.25,
                margin: "1.25rem 0",
                color: "var(--fg-pencil)",
              }}
            >
              I BUILD THINGS THAT AUTOMATE{" "}
              <span
                style={{
                  color: "var(--accent-marker)",
                  borderBottom: "3px wavy var(--accent-marker)",
                  paddingBottom: "2px",
                }}
              >
                THE BORING STUFF.
              </span>
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginBottom: "2rem",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.25rem",
                  color: "var(--fg-muted)",
                }}
              >
                Focus:
              </span>
              <HandBadge variant="pen" tilt="right">
                {role}
              </HandBadge>
              <HandBadge variant="default" dashed>
                📍 {location}
              </HandBadge>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <HandButton
                variant="primary"
                size="lg"
                onClick={onExploreClick}
                tilt="left"
              >
                EXPLORE PROJECTS ↗
              </HandButton>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                className="hero-arrow-note"
              >
                <DrawnArrow
                  direction="curved-down"
                  color="var(--accent-marker)"
                  label="start here!"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Sketchbook Frame & Stats Sticky Note */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            {/* Sketchbook Portrait Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "320px",
                background: "var(--card-bg)",
                border: "3px solid var(--border-pencil)",
                borderRadius: "var(--radius-wobbly-md)",
                boxShadow: "var(--shadow-hard-lg)",
                padding: "1rem",
                transform: "rotate(1.5deg)",
              }}
            >
              <TapeDecoration position="top" />

              {/* Portrait Image or Fallback */}
              <div
                style={{
                  width: "100%",
                  height: "260px",
                  borderRadius: "var(--radius-wobbly)",
                  border: "2px dashed var(--border-pencil)",
                  backgroundColor: "var(--card-tint)",
                  backgroundImage: "url('/images/dev-kansakar.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center 25%",
                  position: "relative",
                  overflow: "hidden",
                }}
                role="img"
                aria-label="Portrait photo of Dev Kansakar"
              >
                {/* Sketch Registration Corner Marks */}
                <span
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: "8px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.2rem",
                    color: "var(--border-pencil)",
                  }}
                >
                  +
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "8px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.2rem",
                    color: "var(--border-pencil)",
                  }}
                >
                  ×
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    left: "8px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.2rem",
                    color: "var(--border-pencil)",
                  }}
                >
                  •
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    right: "8px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.2rem",
                    color: "var(--border-pencil)",
                  }}
                >
                  ✎
                </span>
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "0.75rem",
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.2rem",
                  color: "var(--fg-pencil)",
                }}
              >
                DEV KANSAKAR — <span style={{ color: "var(--accent-marker)" }}>BUILDER</span>
              </div>
            </div>

            {/* Stats Sticky Note Card */}
            <HandCard
              variant="postit"
              decoration="tack"
              tilt="left-sm"
              style={{
                width: "100%",
                maxWidth: "320px",
                padding: "1.25rem 1.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.1rem",
                  color: "var(--accent-pen)",
                  marginBottom: "0.75rem",
                  borderBottom: "2px dashed rgba(45, 45, 45, 0.2)",
                  paddingBottom: "0.3rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>NOTEBOOK STATUS</span>
                <span>VOL. 01</span>
              </div>

              <dl
                style={{
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "0.4rem 1rem",
                  fontSize: "1.15rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                <dt style={{ fontWeight: "bold" }}>LVL:</dt>
                <dd style={{ margin: 0 }}>6 / 10 (Ever Learning)</dd>

                <dt style={{ fontWeight: "bold" }}>XP:</dt>
                <dd style={{ margin: 0, fontFamily: "var(--font-mono)" }}>
                  [//////.....]
                </dd>

                <dt style={{ fontWeight: "bold" }}>STATUS:</dt>
                <dd style={{ margin: 0, color: "#2b825b", fontWeight: "bold" }}>
                  ● ONLINE & BUILDING
                </dd>

                <dt style={{ fontWeight: "bold" }}>ORIGIN:</dt>
                <dd style={{ margin: 0 }}>{location}</dd>
              </dl>

              <div
                style={{
                  marginTop: "0.85rem",
                  paddingTop: "0.5rem",
                  borderTop: "1px dashed rgba(45, 45, 45, 0.2)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.95rem",
                  color: "var(--fg-subtle)",
                  textAlign: "center",
                }}
              >
                Scroll down to read notebook entries ↓
              </div>
            </HandCard>
          </div>
        </div>
      </div>
    </section>
  );
}
