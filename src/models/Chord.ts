const NOTES: { [token: string]: number } = {
  C: 0,
  "C♯": 1,
  "D♭": 1,
  D: 2,
  "D♯": 3,
  "E♭": 3,
  E: 4,
  F: 5,
  "F♯": 6,
  "G♭": 6,
  G: 7,
  "G♯": 8,
  "A♭": 8,
  A: 9,
  "A♯": 10,
  "B♭": 10,
  B: 11,
};

const EXTENSIONS: { [token: string]: { [degree: number]: number } } = {
  "6": { 6: 9 },
  "7": { 7: 10 },
  "9": { 7: 10, 9: 2 },
  "11": { 7: 10, 9: 2, 11: 5 },
  "13": { 7: 10, 9: 2, 11: 5, 13: 9 },
  Δ7: { 7: 11 },
  Δ9: { 7: 11, 9: 2 },
  Δ11: { 7: 11, 9: 2, 11: 5 },
  Δ13: { 7: 11, 9: 2, 11: 5, 13: 9 },
};

const ALTERATIONS: { [token: string]: { degree: number; note: number } } = {
  "♭5": { degree: 5, note: 6 },
  "♯5": { degree: 5, note: 8 },
  "♭9": { degree: 9, note: 1 },
  "♯9": { degree: 9, note: 3 },
  "♭11": { degree: 11, note: 4 },
  "♯11": { degree: 11, note: 6 },
  "♭13": { degree: 13, note: 8 },
  "♯13": { degree: 13, note: 10 },
};

function parseToken<T>(
  src: string,
  tokens: { [token: string]: T }
): [T | undefined, string] {
  for (const name in tokens)
    if (src.startsWith(name)) return [tokens[name], src.slice(name.length)];
  return [undefined, src];
}

export default class Chord {
  name: string;
  notes: { [degree: number]: number | undefined };
  scale: string;

  constructor() {
    this.name = "";
    this.notes = {};
    this.scale = "";
  }

  setName(name: string) {
    this.name = name;
    this.notes = {};

    [this.notes[1], name] = parseToken<number>(name, NOTES);
    if (this.notes[1] === undefined) {
      console.error(`Malformed chord ${this.name}`);
      return;
    }

    if (name[0] === "m") {
      this.notes[3] = this.notes[1] + 3;
      name = name.slice(1);
    } else {
      this.notes[3] = this.notes[1] + 4;
    }

    this.notes[5] = this.notes[1] + 7;

    let extensions;
    [extensions, name] = parseToken<{ [degree: number]: number }>(
      name,
      EXTENSIONS
    );
    if (extensions !== undefined)
      for (const degree in extensions)
        this.notes[degree] = this.notes[1] + extensions[degree];

    let alteration;
    while (
      ([alteration, name] = parseToken<{ degree: number; note: number }>(
        name,
        ALTERATIONS
      ))[0] !== undefined
    )
      this.notes[alteration!.degree] = this.notes[1] + alteration!.note;

    if (name !== "") console.error(`Malformed chord ${this.name}`);

    console.log(this.notes);
  }
}
