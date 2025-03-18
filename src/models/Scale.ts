import Chord from "./Chord";
import Note from "./Note";

export default class Scale {
  static TYPES: { [name: string]: number[] } = {
    major: [0, 2, 4, 5, 7, 9, 11],
    "harmonic minor": [0, 2, 3, 5, 7, 8, 11],
  };

  static SCALES = Note.BY_VALUE.flatMap((_, root) =>
    Object.keys(Scale.TYPES).map((type) => new Scale(root, type))
  );

  name: string;
  notes: number[];

  constructor(root: number, type: string) {
    this.name = `${Note.BY_VALUE[root]} ${type}`;
    this.notes = Scale.TYPES[type].map((note) => (root + note) % 12);
  }

  isParentScale(chord: Chord) {
    for (const degree in chord.notes)
      if (
        chord.notes[degree] !== undefined &&
        !this.notes.includes(chord.notes[degree])
      )
        return false;

    return true;
  }

  difference(other: Scale) {
    let difference = 0;
    for (const note of this.notes)
      if (!other.notes.includes(note)) difference++;
    return difference;
  }
}
