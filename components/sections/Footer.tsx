"use client";

import React from "react";
import { HandButton } from "../hand-drawn/HandButton";

interface FooterProps {
  name: string;
  onScrollToTop: () => void;
}

export function Footer({ name, onScrollToTop }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: "3px dashed var(--border-pencil)",
        backgroundColor: "rgba(253, 251, 247, 0.95)",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
        marginTop: "3rem",
      }}
    >
      <div
        className="hand-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "var(--fg-pencil)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>✎</span> {name.toUpperCase()}
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.15rem",
              color: "#666",
              margin: 0,
            }}
          >
            Crafted with authentic hand-drawn imperfection • Built with Next.js &amp; TypeScript
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
              color: "#888",
            }}
          >
            © {new Date().getFullYear()} ALL SKETCHES RESERVED
          </span>

          <HandButton
            variant="secondary"
            size="sm"
            onClick={onScrollToTop}
            aria-label="Back to top"
          >
            BACK TO TOP ↑
          </HandButton>
        </div>
      </div>
    </footer>
  );
}
