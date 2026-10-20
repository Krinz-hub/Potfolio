import React from "react";

export function DrawnArrow({
  className = "",
  color = "#ff4d4d",
  direction = "right",
  label = "",
}: {
  className?: string;
  color?: string;
  direction?: "right" | "down" | "curved-down" | "curved-up";
  label?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 select-none pointer-events-none ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      {direction === "curved-down" ? (
        <svg
          width="54"
          height="44"
          viewBox="0 0 54 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ stroke: color }}
        >
          <path
            d="M6 6C18 4 44 8 42 28C41.5 32 37 38 32 37"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 30L31 38L25 31"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : direction === "curved-up" ? (
        <svg
          width="48"
          height="38"
          viewBox="0 0 48 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ stroke: color }}
        >
          <path
            d="M8 32C18 30 38 28 38 12C38 8 36 6 32 6"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          <path
            d="M36 12L31 5L25 10"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="38"
          height="24"
          viewBox="0 0 38 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ stroke: color }}
        >
          <path
            d="M4 12C12 11.5 24 12.5 32 12"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          <path
            d="M24 5L33 12L24 19"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {label && (
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1rem",
            transform: "rotate(-3deg)",
            color,
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}

export function DrawnScribble({
  type = "underline",
  color = "#ff4d4d",
  className = "",
}: {
  type?: "underline" | "circle" | "sparkle";
  color?: string;
  className?: string;
}) {
  if (type === "circle") {
    return (
      <svg
        className={className}
        width="110"
        height="50"
        viewBox="0 0 110 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ stroke: color }}
        aria-hidden="true"
      >
        <path
          d="M15 25C12 12 35 4 60 5C85 6 102 14 103 26C104 38 78 45 45 44C18 43 5 33 8 22"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="180"
          strokeDashoffset="0"
        />
      </svg>
    );
  }

  if (type === "sparkle") {
    return (
      <svg
        className={className}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ stroke: color }}
        aria-hidden="true"
      >
        <path d="M14 2V26M2 14H26" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M6 6L22 22M6 22L22 6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 3"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="120"
      height="14"
      viewBox="0 0 120 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ stroke: color }}
      aria-hidden="true"
    >
      <path
        d="M3 9C20 4 40 12 60 7C80 3 100 11 117 6"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TapeDecoration({
  className = "",
  position = "top",
}: {
  className?: string;
  position?: "top" | "corner-right" | "corner-left";
}) {
  if (position === "corner-right") {
    return <div className={`tape-strip-corner ${className}`} aria-hidden="true" />;
  }
  return <div className={`tape-strip ${className}`} aria-hidden="true" />;
}

export function ThumbtackDecoration({ className = "" }: { className?: string }) {
  return <div className={`thumbtack-pin ${className}`} aria-hidden="true" />;
}
