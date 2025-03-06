import Chord from "./Chord";
import Note from "./Note";

export default class Scale {
  static types: { [name: string]: number[] } = {
    "maj.": [0, 2, 4, 5, 7, 9, 11],
    "harm. min.": [0, 2, 3, 5, 7, 8, 11],
  };

  static getAll() {
    const scales = [];
    for (let root = 0; root < 12; root++)
      for (const type in Scale.types) scales.push(new Scale(root, type));
    return scales;
  }

  name: string;
  notes: number[];

  constructor(root: number, type: string) {
    this.name = `${Note.byValue[root]} ${type}`;
    this.notes = Scale.types[type].map((note) => (root + note) % 12);
  }

  isParentScale(chord: Chord) {
    for (const degree in chord.notes)
      if (
        chord.notes[degree] !== undefined &&
        !this.notes.includes(chord.notes[degree])
      ) {
        return false;
      }
    return true;
  }
}
