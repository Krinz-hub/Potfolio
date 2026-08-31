"use client";

import { useEffect } from "react";

export function MagneticField() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const buttons = [...document.querySelectorAll<HTMLElement>("[data-magnetic]")];
    const listeners = buttons.map((button) => {
      const move = (event: PointerEvent) => { const box = button.getBoundingClientRect(); button.style.transform = `translate(${((event.clientX - box.left) / box.width - .5) * 8}px, ${((event.clientY - box.top) / box.height - .5) * 6}px)`; };
      const leave = () => { button.style.transform = ""; };
      button.addEventListener("pointermove", move); button.addEventListener("pointerleave", leave);
      return () => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", leave); };
    });
    return () => listeners.forEach((cleanup) => cleanup());
  }, []);
  return null;
}
