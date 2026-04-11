"use client";

import { useEffect, useRef } from "react";

function getCursorMode(target) {
  if (!(target instanceof Element)) {
    return "default";
  }

  const customTarget = target.closest("[data-cursor]");

  if (customTarget) {
    return customTarget.getAttribute("data-cursor") || "default";
  }

  if (target.closest("video")) {
    return "media";
  }

  if (target.closest("a, button")) {
    return "link";
  }

  return "default";
}

export default function InteractiveEffects() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canHover || !hasFinePointer || reduceMotion) {
      return undefined;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const progress = progressRef.current;

    if (!dot || !ring || !progress) {
      return undefined;
    }

    const html = document.documentElement;
    const body = document.body;

    body.classList.add("has-custom-cursor");
    html.style.setProperty("--pointer-x", `${window.innerWidth * 0.5}px`);
    html.style.setProperty("--pointer-y", `${window.innerHeight * 0.3}px`);

    let currentX = window.innerWidth * 0.5;
    let currentY = window.innerHeight * 0.3;
    let targetX = currentX;
    let targetY = currentY;
    let cursorVisible = false;
    let cursorMode = "default";
    let frameId = 0;

    function setCursorVisible(visible) {
      const value = visible ? "true" : "false";
      dot.dataset.visible = value;
      ring.dataset.visible = value;
    }

    function setCursorMode(mode) {
      cursorMode = mode;
      dot.dataset.mode = mode;
      ring.dataset.mode = mode;
    }

    function updateScrollProgress() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, progressValue))})`;
    }

    function render() {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      const translate = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = translate;
      ring.style.transform = translate;

      frameId = window.requestAnimationFrame(render);
    }

    function handlePointerMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      html.style.setProperty("--pointer-x", `${event.clientX}px`);
      html.style.setProperty("--pointer-y", `${event.clientY}px`);

      if (!cursorVisible) {
        cursorVisible = true;
        setCursorVisible(true);
      }

      const nextMode = getCursorMode(event.target);

      if (nextMode !== cursorMode) {
        setCursorMode(nextMode);
      }
    }

    function handlePointerDown() {
      dot.dataset.pressed = "true";
      ring.dataset.pressed = "true";
    }

    function handlePointerUp(event) {
      dot.dataset.pressed = "false";
      ring.dataset.pressed = "false";
      setCursorMode(getCursorMode(event.target));
    }

    function hideCursor() {
      cursorVisible = false;
      setCursorVisible(false);
    }

    setCursorVisible(false);
    setCursorMode("default");
    updateScrollProgress();
    frameId = window.requestAnimationFrame(render);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("blur", hideCursor);
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("blur", hideCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      body.classList.remove("has-custom-cursor");
      html.style.removeProperty("--pointer-x");
      html.style.removeProperty("--pointer-y");
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="scroll-progress-shell">
        <div ref={progressRef} className="scroll-progress-bar" />
      </div>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
