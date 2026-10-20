"use client";

import React from "react";
import { HandButton } from "../hand-drawn/HandButton";

interface HeaderProps {
  initials: string;
  activeSection: string;
  sound: boolean;
  theme: "light" | "dark";
  menuOpen: boolean;
  onLogoClick: () => void;
  onNavClick: (targetId: string) => void;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
}

const navItems = [
  { label: "ABOUT", id: "about" },
  { label: "STACK", id: "stack" },
  { label: "PROJECTS", id: "projects" },
  { label: "LOG", id: "log" },
  { label: "LAB", id: "lab" },
  { label: "CONTACT", id: "contact" },
] as const;

export function Header({
  initials,
  activeSection,
  sound,
  theme,
  menuOpen,
  onLogoClick,
  onNavClick,
  onToggleSound,
  onToggleTheme,
  onToggleMenu,
}: HeaderProps) {
  return (
    <header className="hand-header">
      <div className="hand-container hand-nav-row">
        {/* Monogram Stamp Logo */}
        <button
          className="hand-logo"
          onClick={onLogoClick}
          aria-label="Back to top"
          title="Dev Kansakar (Click 5 times for secret!)"
        >
          {initials}
        </button>

        {/* Desktop Navigation */}
        <nav className="hand-nav-links" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection.toLowerCase() === item.id;
            return (
              <button
                key={item.id}
                className={`hand-nav-item ${isActive ? "active" : ""}`}
                onClick={() => onNavClick(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="hand-controls">
          <span
            className="hand-tag hand-tag-yellow"
            style={{ fontSize: "0.95rem", padding: "0.2rem 0.6rem" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#2b825b",
              }}
            />
            ONLINE
          </span>

          {/* Theme Toggle Button */}
          <HandButton
            variant="secondary"
            size="sm"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀️ LIGHT" : "🌙 DARK"}
          </HandButton>

          <HandButton
            variant="secondary"
            size="sm"
            onClick={onToggleSound}
            aria-pressed={sound}
            aria-label="Toggle sound feedback"
            title="Toggle synthesizer sounds"
          >
            ♪ {sound ? "ON" : "OFF"}
          </HandButton>

          {/* Mobile Menu Button */}
          <button
            className="hand-btn hand-btn-sm"
            onClick={onToggleMenu}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            style={{ display: "inline-flex" }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className="hand-container"
          style={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
            borderTop: "2px dashed var(--border-pencil)",
            marginTop: "0.75rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.75rem",
            }}
          >
            {navItems.map((item) => (
              <HandButton
                key={item.id}
                variant="secondary"
                size="sm"
                onClick={() => onNavClick(item.id)}
              >
                {item.label}
              </HandButton>
            ))}
          </div>

          <div
            style={{
              marginTop: "0.9rem",
              display: "flex",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <HandButton
              variant="secondary"
              size="sm"
              onClick={onToggleTheme}
              style={{ width: "100%" }}
            >
              {theme === "dark" ? "☀️ SWITCH TO LIGHT" : "🌙 SWITCH TO DARK"}
            </HandButton>
          </div>
        </div>
      )}
    </header>
  );
}
