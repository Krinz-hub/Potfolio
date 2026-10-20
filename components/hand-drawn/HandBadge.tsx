import React from "react";

export interface HandBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "marker" | "pen" | "yellow";
  dashed?: boolean;
  tilt?: "none" | "left" | "right";
  children: React.ReactNode;
}

export function HandBadge({
  variant = "default",
  dashed = false,
  tilt = "none",
  className = "",
  children,
  ...props
}: HandBadgeProps) {
  const variantClass =
    variant === "marker"
      ? "hand-tag-marker"
      : variant === "pen"
        ? "hand-tag-pen"
        : variant === "yellow"
          ? "hand-tag-yellow"
          : "";

  const dashedClass = dashed ? "hand-tag-dashed" : "";
  const tiltClass =
    tilt === "left"
      ? "tilt-left-sm"
      : tilt === "right"
        ? "tilt-right-sm"
        : "";

  return (
    <span
      className={`hand-tag ${variantClass} ${dashedClass} ${tiltClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
