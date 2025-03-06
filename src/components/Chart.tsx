"use client";

import { useEffect, useState } from "react";
import FlexInput from "./FlexInput";
import ChordInput from "./ChordInput";
import Chord from "@/models/Chord";
import Scale from "@/models/Scale";

export default function Chart() {
  const [chords, setChords] = useState<Chord[]>([new Chord()]);
  const [scales, setScales] = useState<Scale[][]>([[]]);

  useEffect(() => {
    for (let i = 1; i < chords.length; i++)
      if (chords[i].name === "") chords[i].notes = chords[i - 1].notes;
    setScales(
      chords.map((chord) =>
        Scale.getAll().filter((scale) => scale.isParentScale(chord))
      )
    );
  }, [chords]);

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
            scales={scales[i]}
            setValue={(name: string) => {
              chords[i].setName(name);
              setChords([...chords]);
            }}
            key={i}
          />
        ))}
        <ChordInput
          defaultValue={chords[chords.length - 1].name}
          scales={scales[chords.length - 1]}
          setValue={(name: string) => {
            chords[chords.length - 1].setName(name);
            setChords([...chords]);
          }}
          onKeyDown={(e) => {
            const input = e.target as HTMLInputElement;
            if (e.key === "Tab") {
              e.preventDefault();
              input.value = "";
              input.dispatchEvent(new Event("input", { bubbles: true }));
              setChords([...chords, new Chord()]);
              setScales([...scales, []]);
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
