# Circle of Fifths Music React App

## Architecture Overview

This project is a modular, functional React app for visualizing and interacting with the circle of fifths, with real-time chord detection.

### Key Architectural Features

- **Constants and Utilities**: Musical constants (`NOTES_CHROMATIC`, `DEFAULT_OCTAVE`, `CHORD_DEFINITIONS`) and utility functions (`formatNoteWithOctave`, `getCirclePositions`) are separated into dedicated files for clarity and reusability.
- **Functional Programming**: Pure functions and stateless components are used wherever possible. State is managed at the top level and passed down as props.
- **Component Structure**:
  - `App.tsx`: Entry point, renders the main `CircleOfFifths` component.
  - `components/CircleOfFifths.tsx`: Main logic, state, and chord detection.
  - `components/NoteCircle.tsx`: Renders the interactive SVG note circle.
  - `components/ChordDisplay.tsx`: Displays the detected chord.
- **Chord Detection**: When 3, 4, or 5 notes are selected, the app detects and displays the corresponding chord using internal logic based on intervals.
- **Styling**: Minimal, easily extendable CSS.

### File Structure

```
src/
  App.tsx
  index.tsx
  styles.css
  constants/
    notes.ts
    chords.ts
  utils/
    noteUtils.ts
  components/
    CircleOfFifths.tsx
    NoteCircle.tsx
    ChordDisplay.tsx
```

### How Chord Detection Works

- When notes are selected, the app computes intervals from each possible root and matches them against known chord definitions.
- The detected chord name is displayed in the circle. If no match is found, "Accord inconnu" is shown.

### Extending

- To add more chords, edit `src/constants/chords.ts`.
- For more advanced detection, upgrade Node.js and install the [Tonal](https://github.com/tonaljs/tonal) library.

---

## Getting Started

1. Install dependencies:  
   `yarn install`
2. Start the app:  
   `yarn start`
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## License

MIT (add a license field in package.json if desired)
