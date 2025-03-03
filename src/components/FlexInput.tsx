"use client";

import { FormEvent, useEffect, useRef } from "react";

export default function FlexInput(props: React.ComponentProps<"input">) {
  const inputRef = useRef<HTMLInputElement>(null);
  const filteredProps = { ...props };
  delete filteredProps.onInput;

  function handleInput(e: FormEvent<HTMLInputElement>) {
    if (props.onInput) props.onInput(e);

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

  return <input ref={inputRef} onInput={handleInput} {...filteredProps} />;
}
