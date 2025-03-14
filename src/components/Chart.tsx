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

    const table = chords.map((_) => Scale.SCALES.map((_) => Infinity));
    const backtrace: number[][][] = chords.map((_) =>
      Scale.SCALES.map((_) => [])
    );

    for (let j = 0; j < Scale.SCALES.length; j++)
      if (Scale.SCALES[j].isParentScale(chords[0])) table[0][j] = 0;

    for (let i = 1; i < chords.length; i++) {
      for (let j = 0; j < Scale.SCALES.length; j++) {
        if (!Scale.SCALES[j].isParentScale(chords[i])) continue;

        let min = Infinity;
        for (let k = 0; k < Scale.SCALES.length; k++) {
          const cost =
            table[i - 1][k] + Scale.SCALES[j].difference(Scale.SCALES[k]);

          if (cost < min) {
            min = cost;
            backtrace[i][j] = [k];
          } else if (cost === min) backtrace[i][j].push(k);
        }

        table[i][j] = min;
      }
    }

    function pushScales(i: number, j: number) {
      if (!scales[i].includes(Scale.SCALES[j])) scales[i].push(Scale.SCALES[j]);
      if (i === 0) return;
      for (const k of backtrace[i][j]) pushScales(i - 1, k);
    }

    const min = Math.min(...table[chords.length - 1]);
    for (const i in scales) scales[i] = [];
    for (let j = 0; j < Scale.SCALES.length; j++)
      if (table[chords.length - 1][j] === min) pushScales(chords.length - 1, j);

    setScales([...scales]);
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
