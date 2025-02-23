"use client";

import { useState } from "react";
import FlexInput from "./FlexInput";

export default function Chart() {
  const [chords, setChords] = useState<string[]>([""]);

  return (
    <>
      <h1 className="text-4xl mb-4">
        <FlexInput placeholder="Chart Name" />
      </h1>
      <div className="m-auto max-w-prose grid grid-cols-8 gap-1 text-left text-xl">
        {chords.slice(0, -1).map((chord, i) => (
          <FlexInput
            defaultValue={chord}
            placeholder="%"
            onChange={(e) => {
              chords[i] = e.target.value;
            }}
            key={i}
          />
        ))}
        <FlexInput
          defaultValue={chords[chords.length - 1]}
          placeholder="%"
          onChange={(e) => {
            chords[chords.length - 1] = e.target.value;
          }}
          onKeyDown={(e) => {
            const input = e.target as HTMLInputElement;

            if (e.key === "Tab") {
              e.preventDefault();
              input.value = "";
              input.dispatchEvent(new Event("input", { bubbles: true }));
              setChords([...chords, ""]);
              return;
            }

            if (
              e.key === "Backspace" &&
              input.value === "" &&
              chords.length > 1
            ) {
              e.preventDefault();
              input.value = chords[chords.length - 2];
              input.dispatchEvent(new Event("input", { bubbles: true }));
              setChords(chords.slice(0, -1));
            }
          }}
        />
      </div>
    </>
  );
}
