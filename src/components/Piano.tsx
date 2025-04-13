
import PianoKey from "./PianoKey";

interface PianoProps {
  onNoteSelected: (position: number) => void;
}

const Piano = ({ onNoteSelected }: PianoProps) => {
  // Define the white and black keys with positions
  const whiteKeys = [
    { note: 'C1', position: 1 },
    { note: 'D1', position: 3 },
    { note: 'E1', position: 5 },
    { note: 'F1', position: 6 },
    { note: 'G1', position: 8 },
    { note: 'A1', position: 10 },
    { note: 'B1', position: 12 },
    { note: 'C2', position: 13 },
    { note: 'D2', position: 15 },
    { note: 'E2', position: 17 },
    { note: 'F2', position: 18 },
    { note: 'G2', position: 20 },
    { note: 'A2', position: 22 },
    { note: 'B2', position: 24 },
  ];

  const blackKeys = [
    { note: 'C#1', position: 2 },
    { note: 'D#1', position: 4 },
    { note: 'F#1', position: 7 },
    { note: 'G#1', position: 9 },
    { note: 'A#1', position: 11 },
    { note: 'C#2', position: 14 },
    { note: 'D#2', position: 16 },
    { note: 'F#2', position: 19 },
    { note: 'G#2', position: 21 },
    { note: 'A#2', position: 23 },
  ];

  // Map black key notes to the index of their preceding white key
  const blackKeyOffsets: Record<string, number> = {
    'C#1': 0,
    'D#1': 1,
    'F#1': 3,
    'G#1': 4,
    'A#1': 5,
    'C#2': 7,
    'D#2': 8,
    'F#2': 10,
    'G#2': 11,
    'A#2': 12,
  };

  const handleKeyPress = (position: number) => {
    onNoteSelected(position);
  };

  return (
    <div className="relative flex items-end justify-center w-full max-w-4xl mx-auto">
      {/* White keys */}
      <div className="flex relative z-0">
        {whiteKeys.map((key) => (
          <PianoKey
            key={key.note}
            note={key.note}
            position={key.position}
            onKeyPress={handleKeyPress}
          />
        ))}
      </div>

      {/* Black keys */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="relative w-full h-full">
          {blackKeys.map((key) => (
            <div
              key={key.note}
              className="absolute"
              style={{
                left: `calc(${blackKeyOffsets[key.note]} * 56px + 40px)`,
              }}
            >
              <PianoKey
                note={key.note}
                position={key.position}
                isBlack
                onKeyPress={handleKeyPress}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Piano;
