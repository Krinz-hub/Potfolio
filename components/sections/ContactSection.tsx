"use client";

import React from "react";
import { HandCard } from "../hand-drawn/HandCard";
import { HandButton } from "../hand-drawn/HandButton";
import { HandBadge } from "../hand-drawn/HandBadge";
import { DrawnScribble, DrawnArrow } from "../hand-drawn/DrawnDecorations";

interface ContactSectionProps {
  email: string;
  social: {
    readonly github: string;
    readonly linkedin: string;
    readonly Youtube: string;
  };
}

export function ContactSection({ email, social }: ContactSectionProps) {
  return (
    <section className="hand-section" id="contact" data-nav="CONTACT">
      <div className="hand-container">
        <div className="section-label-hand">07 / GET IN TOUCH & COLLABORATE</div>

        <HandCard
          variant="paper"
          decoration="tape"
          tilt="none"
          style={{
            padding: "clamp(2rem, 5vw, 3.5rem)",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#fffdf9",
          }}
        >
          {/* Postcard Stamp at Top-Right */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "70px",
              height: "85px",
              border: "3px dashed var(--accent-marker)",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff0f0",
              transform: "rotate(4deg)",
              boxShadow: "2px 2px 0px 0px var(--border-pencil)",
            }}
            aria-hidden="true"
          >
            <span style={{ fontSize: "1.75rem" }}>✉</span>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.75rem",
                fontWeight: "bold",
                color: "var(--accent-marker)",
              }}
            >
              AIR MAIL
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
              lineHeight: 1.1,
              color: "var(--fg-pencil)",
              marginBottom: "1rem",
              maxWidth: "650px",
            }}
          >
            LET&apos;S BUILD{" "}
            <span
              style={{
                color: "var(--accent-marker)",
                borderBottom: "3px wavy var(--accent-marker)",
              }}
            >
              SOMETHING
            </span>{" "}
            USEFUL.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.5rem",
              lineHeight: 1.6,
              color: "#444",
              maxWidth: "650px",
              marginBottom: "2rem",
            }}
          >
            Have an idea to discuss? Need a customized automation or API pipeline?
            Building something interesting and want a human perspective? Send me an
            email or connect on socials.
          </p>

          {/* Email Primary CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            <HandButton
              variant="primary"
              size="lg"
              href={`mailto:${email}`}
              tilt="left"
            >
              ✉ {email} ↗
            </HandButton>

            <DrawnArrow
              direction="curved-up"
              color="var(--accent-pen)"
              label="say hello!"
            />
          </div>

          {/* Social Links Bar */}
          <div
            style={{
              borderTop: "2px dashed var(--muted-paper)",
              paddingTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.15rem",
                  color: "#666",
                }}
              >
                SOCIAL DISPATCH:
              </span>

              <HandButton
                variant="secondary"
                size="sm"
                href={social.github}
                external
              >
                GITHUB ↗
              </HandButton>

              <HandButton
                variant="secondary"
                size="sm"
                href={social.linkedin}
                external
              >
                LINKEDIN ↗
              </HandButton>

              <HandButton
                variant="secondary"
                size="sm"
                href={social.Youtube}
                external
              >
                YOUTUBE ↗
              </HandButton>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="hand-stamp hand-stamp-green">
                CONNECTION OPEN
              </span>
            </div>
          </div>
        </HandCard>
      </div>
    </section>
  );
}
