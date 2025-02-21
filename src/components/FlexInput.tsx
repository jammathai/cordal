"use client";

import { useEffect, useRef } from "react";

export default function FlexInput({
  placeholder,
}: Readonly<{ placeholder: string }>) {
  const inputRef = useRef<HTMLInputElement>(null);
  let ctx: CanvasRenderingContext2D;

  function measureText(text: string) {
    return ctx.measureText(text).width + "px";
  }

  useEffect(() => {
    ctx = document.createElement("canvas").getContext("2d")!;
    const event = new Event("input", { bubbles: true });
    inputRef.current!.dispatchEvent(event);
  }, []);

  return (
    <input
      ref={inputRef}
      className="w-0 bg-transparent placeholder-placeholder outline-none"
      placeholder={placeholder}
      onInput={() => {
        const input = inputRef.current!;
        ctx.font = getComputedStyle(input).font;
        input.style.width = measureText(input.value || placeholder);
      }}
    />
  );
}
