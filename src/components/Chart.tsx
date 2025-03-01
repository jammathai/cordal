"use client";

import { useState } from "react";
import FlexInput from "./FlexInput";
import ChordInput from "./ChordInput";
import Chord from "@/models/Chord";

export default function Chart() {
  const [chords, setChords] = useState<Chord[]>([new Chord()]);

  function setChord(index: number, value: string) {
    chords[index].setName(value);
    setChords(chords);
  }

  return (
    <>
      <h1 className="text-4xl mb-2">
        <FlexInput
          className="w-0 p-1 rounded-md bg-transparent placeholder-placeholder"
          placeholder="Chart Name"
        />
      </h1>
      <div className="m-auto max-w-2xl grid grid-cols-4 text-left text-2xl">
        {chords.slice(0, -1).map((chord, i) => (
          <ChordInput
            defaultValue={chord.name}
            scale={chord.scale}
            setValue={(name: string) => {
              setChord(i, name);
            }}
            key={i}
          />
        ))}
        <ChordInput
          defaultValue={chords[chords.length - 1].name}
          scale={chords[chords.length - 1].scale}
          setValue={(value: string) => {
            setChord(chords.length - 1, value);
          }}
          onKeyDown={(e) => {
            const input = e.target as HTMLInputElement;
            if (e.key === "Tab") {
              e.preventDefault();
              input.value = "";
              input.dispatchEvent(new Event("input", { bubbles: true }));
              setChords([...chords, new Chord()]);
            } else if (
              e.key === "Backspace" &&
              input.value === "" &&
              chords.length > 1
            ) {
              e.preventDefault();
              input.value = chords[chords.length - 2].name;
              input.dispatchEvent(new Event("input", { bubbles: true }));
              setChords(chords.slice(0, -1));
            }
          }}
        />
      </div>
    </>
  );
}
