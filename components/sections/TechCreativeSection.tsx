"use client";

import React from "react";
import { HandCard } from "../hand-drawn/HandCard";
import { HandBadge } from "../hand-drawn/HandBadge";
import { DrawnScribble } from "../hand-drawn/DrawnDecorations";

interface TechCreativeSectionProps {
  techDescription: Record<string, string>;
  activeTech: string;
  onSelectTech: (tech: string) => void;
}

export function TechCreativeSection({
  techDescription,
  activeTech,
  onSelectTech,
}: TechCreativeSectionProps) {
  const topics = Object.keys(techDescription);

  return (
    <section className="hand-section" id="creative" data-nav="CREATIVE">
      <div className="hand-container">
        <div className="section-label-hand">05 / TECH × CREATIVE DISCIPLINE</div>
        <h2 className="section-marker-title">
          THE USEFUL EDGE OF TECH
          <DrawnScribble type="underline" color="var(--accent-marker)" />
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.45rem",
            color: "var(--fg-muted)",
            maxWidth: "750px",
            marginBottom: "2rem",
          }}
        >
          Tools matter most when they make people’s work, decisions, or ideas easier
          to move forward. Click any discipline below to view the core insight:
        </p>

        {/* Buttons Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.85rem",
            marginBottom: "2rem",
          }}
          role="group"
          aria-label="Areas of discipline"
        >
          {topics.map((item) => {
            const isActive = activeTech === item;
            return (
              <button
                key={item}
                onClick={() => onSelectTech(item)}
                className="hand-btn"
                style={{
                  backgroundColor: isActive ? "var(--accent-pen)" : "var(--card-bg)",
                  color: isActive ? "#ffffff" : "var(--fg-pencil)",
                  borderColor: "var(--border-pencil)",
                  fontSize: "1.15rem",
                  padding: "0.5rem 1.1rem",
                  transform: isActive ? "scale(1.05) rotate(-1deg)" : "none",
                  boxShadow: isActive
                    ? "2px 2px 0px 0px var(--border-pencil)"
                    : "var(--shadow-hard-sm)",
                }}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Speech Bubble Insight Card */}
        <HandCard
          variant="speech"
          decoration="none"
          tilt="right-sm"
          style={{
            padding: "2rem",
            maxWidth: "700px",
            backgroundColor: "var(--postit-yellow)",
            borderWidth: "3px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
            }}
          >
            <HandBadge variant="marker">INSIGHT ON: {activeTech}</HandBadge>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                color: "var(--fg-subtle)",
              }}
            >
              DEV&apos;S NOTE
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)",
              lineHeight: 1.35,
              color: "var(--fg-pencil)",
              margin: 0,
            }}
            aria-live="polite"
          >
            &ldquo;{techDescription[activeTech]}&rdquo;
          </p>
        </HandCard>
      </div>
    </section>
  );
}
