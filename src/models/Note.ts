export default class Note {
  static byName: { [token: string]: number } = {
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

  static byValue = [
    "C",
    "C♯/D♭",
    "D",
    "D♯/E♭",
    "E",
    "F",
    "F♯/G♭",
    "G",
    "G♯/A♭",
    "A",
    "A♯/B♭",
    "B",
  ];
}
