"use client";

import { useEffect, useRef } from "react";

export default function FlexInput({
  placeholder,
}: Readonly<{ placeholder: string }>) {
  const inputRef = useRef<HTMLInputElement>(null);

  function resize() {
    const input = inputRef.current!;
    const ctx = document.createElement("canvas").getContext("2d")!;
    ctx.font = getComputedStyle(input).font;
    const textWidth = ctx.measureText(input.value || placeholder).width;
    const padding = parseFloat(getComputedStyle(input).padding) * 2;
    input.style.width = textWidth + padding + "px";
  }

  useEffect(() => {
    const event = new Event("input", { bubbles: true });
    inputRef.current!.dispatchEvent(event);
  }, []);

  return (
    <input
      ref={inputRef}
      className="w-0 p-1 rounded-md bg-transparent placeholder-placeholder"
      placeholder={placeholder}
      onInput={resize}
    />
  );
}
