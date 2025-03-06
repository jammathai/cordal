import Note from "./Note";

export default class Chord {
  static extensions: { [token: string]: { [degree: number]: number } } = {
    "6": { 6: 9 },
    "7": { 7: 10 },
    "9": { 7: 10, 9: 2 },
    "11": { 7: 10, 9: 2, 11: 5 },
    "13": { 7: 10, 9: 2, 11: 5, 13: 9 },
    M7: { 7: 11 },
    M9: { 7: 11, 9: 2 },
    M11: { 7: 11, 9: 2, 11: 5 },
    M13: { 7: 11, 9: 2, 11: 5, 13: 9 },
  };

  static alterations: { [token: string]: { degree: number; note: number } } = {
    "♭5": { degree: 5, note: 6 },
    "♯5": { degree: 5, note: 8 },
    "♭9": { degree: 9, note: 1 },
    "♯9": { degree: 9, note: 3 },
    "♭11": { degree: 11, note: 4 },
    "♯11": { degree: 11, note: 6 },
    "♭13": { degree: 13, note: 8 },
    "♯13": { degree: 13, note: 10 },
  };

  static parseToken<T>(
    src: string,
    tokens: { [token: string]: T }
  ): [T | undefined, string] {
    for (const name of Object.keys(tokens).sort((a, b) => b.length - a.length))
      if (src.startsWith(name)) return [tokens[name], src.slice(name.length)];
    return [undefined, src];
  }

  name: string;
  notes: { [degree: number]: number | undefined };

  constructor() {
    this.name = "";
    this.notes = {};
  }

  setName(name: string) {
    this.name = name;
    this.notes = {};

    [this.notes[1], name] = Chord.parseToken<number>(name, Note.byName);
    if (this.notes[1] === undefined) {
      console.error(`Malformed chord "${this.name}": invalid root`);
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
    [extensions, name] = Chord.parseToken<{ [degree: number]: number }>(
      name,
      Chord.extensions
    );
    if (extensions !== undefined)
      for (const degree in extensions)
        this.notes[degree] = this.notes[1] + extensions[degree];

    let alteration;
    while (
      ([alteration, name] = Chord.parseToken<{ degree: number; note: number }>(
        name,
        Chord.alterations
      ))[0] !== undefined
    )
      this.notes[alteration!.degree] = this.notes[1] + alteration!.note;

    for (let degree in this.notes)
      if (this.notes[degree] !== undefined) this.notes[degree] %= 12;

    if (name !== "")
      console.error(
        `Malformed chord "${this.name}": unrecognized string "${name}"`
      );
  }
}
