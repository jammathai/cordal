"use client";

import { useEffect, useRef } from "react";

export default function FlexInput(props: React.ComponentProps<"input">) {
  const inputRef = useRef<HTMLInputElement>(null);

  function resize() {
    const input = inputRef.current!;
    const ctx = document.createElement("canvas").getContext("2d")!;
    ctx.font = getComputedStyle(input).font;
    const textWidth = ctx.measureText(
      input.value || props.placeholder || ""
    ).width;
    const padding = parseFloat(getComputedStyle(input).padding) * 2;
    input.style.width = textWidth + padding + "px";
  }

  useEffect(() => {
    inputRef.current!.dispatchEvent(new Event("input", { bubbles: true }));
  }, []);

  return (
    <input
      ref={inputRef}
      className="w-0 p-1 rounded-md bg-transparent placeholder-placeholder"
      onInput={resize}
      {...props}
    />
  );
}
