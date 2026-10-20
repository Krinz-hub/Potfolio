import React from "react";

export interface HandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pen" | "yellow";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  tilt?: "none" | "left" | "right";
  children: React.ReactNode;
}

export function HandButton({
  variant = "primary",
  size = "md",
  href,
  external,
  tilt = "none",
  className = "",
  children,
  onClick,
  ...props
}: HandButtonProps) {
  const variantClass =
    variant === "secondary"
      ? "hand-btn-secondary"
      : variant === "pen"
        ? "hand-btn-pen"
        : variant === "yellow"
          ? "hand-card-postit"
          : "";

  const sizeClass =
    size === "sm" ? "hand-btn-sm" : size === "lg" ? "hand-btn-lg" : "";

  const tiltClass =
    tilt === "left"
      ? "tilt-left-sm"
      : tilt === "right"
        ? "tilt-right-sm"
        : "";

  const combinedClass = `hand-btn ${variantClass} ${sizeClass} ${tiltClass} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
