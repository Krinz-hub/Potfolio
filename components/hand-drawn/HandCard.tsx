import React from "react";
import { TapeDecoration, ThumbtackDecoration } from "./DrawnDecorations";

export interface HandCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "paper" | "postit" | "speech";
  decoration?: "tape" | "tack" | "tape-corner" | "none";
  tilt?: "none" | "left-sm" | "right-sm" | "left-md" | "right-md";
  children: React.ReactNode;
}

export function HandCard({
  variant = "paper",
  decoration = "none",
  tilt = "none",
  className = "",
  children,
  ...props
}: HandCardProps) {
  const variantClass =
    variant === "postit"
      ? "hand-card-postit"
      : variant === "speech"
        ? "speech-bubble"
        : "";

  const tiltClass =
    tilt === "left-sm"
      ? "tilt-left-sm"
      : tilt === "right-sm"
        ? "tilt-right-sm"
        : tilt === "left-md"
          ? "tilt-left-md"
          : tilt === "right-md"
            ? "tilt-right-md"
            : "";

  return (
    <div
      className={`hand-card ${variantClass} ${tiltClass} ${className}`.trim()}
      {...props}
    >
      {decoration === "tape" && <TapeDecoration position="top" />}
      {decoration === "tape-corner" && <TapeDecoration position="corner-right" />}
      {decoration === "tack" && <ThumbtackDecoration />}
      {children}
    </div>
  );
}
