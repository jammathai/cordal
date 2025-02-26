"use client";

import { useState } from "react";
import FlexInput from "./FlexInput";
import Chord from "./Chord";

export default function Chart() {
  const [chords, setChords] = useState<string[]>([""]);

  return (
    <>
      <h1 className="text-4xl mb-4">
        <FlexInput
          className="w-0 p-1 rounded-md bg-transparent placeholder-placeholder"
          placeholder="Chart Name"
        />
      </h1>
      <div className="m-auto max-w-2xl grid grid-cols-4 text-left text-2xl">
        {chords.slice(0, -1).map((chord, i) => (
          <Chord
            defaultValue={chord}
            setValue={(value: string) => {
              setChords(chords.map((_, j) => (j === i ? value : chords[j])));
            }}
            key={i}
          />
        ))}
        <Chord
          defaultValue={chords[chords.length - 1]}
          setValue={(value: string) => {
            setChords(
              chords.map((_, i) =>
                i === chords.length - 1 ? value : chords[i]
              )
            );
          }}
          onKeyDown={(e) => {
            const input = e.target as HTMLInputElement;
            if (e.key === "Tab") {
              e.preventDefault();
              input.value = "";
              input.dispatchEvent(new Event("input", { bubbles: true }));
              setChords([...chords, ""]);
            } else if (
              e.key === "Backspace" &&
              input.value === "" &&
              chords.length > 0
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
