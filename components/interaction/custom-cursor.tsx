"use client";

import { useEffect, useRef } from "react";

const labels: Record<string, string> = { link: "→", button: "CLICK", project: "OPEN", image: "VIEW", profile: "PLAYER", nav: "GO", lab: "ENTER" };

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const frame = useRef<number>(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduceMotion.matches || !cursor.current) return;
    const node = cursor.current;
    const render = () => { current.current.x += (target.current.x - current.current.x) * 0.24; current.current.y += (target.current.y - current.current.y) * 0.24; node.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`; frame.current = requestAnimationFrame(render); };
    const move = (event: PointerEvent) => { target.current = { x: event.clientX, y: event.clientY }; const kind = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]")?.dataset.cursor || "default"; node.dataset.state = kind; node.querySelector("span")!.textContent = labels[kind] || "+"; };
    const click = () => { node.dataset.click = "true"; window.setTimeout(() => delete node.dataset.click, 220); };
    document.documentElement.dataset.cursorReady = "true";
    window.addEventListener("pointermove", move, { passive: true }); window.addEventListener("pointerdown", click, { passive: true }); frame.current = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame.current); window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", click); delete document.documentElement.dataset.cursorReady; };
  }, []);
  return <div className="pixel-cursor" ref={cursor} aria-hidden="true"><span>+</span><i /><i /><i /><i /></div>;
}
