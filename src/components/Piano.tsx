
import PianoKey from "./PianoKey";

interface PianoProps {
  onNoteSelected: (position: number) => void;
}

const Piano = ({ onNoteSelected }: PianoProps) => {
  // Define the white and black keys with positions
  const whiteKeys = [
    { note: 'E1', position: 1 },
    { note: 'F1', position: 2 },
    { note: 'G1', position: 4 },
    { note: 'A2', position: 6 },
    { note: 'B2', position: 8 },
    { note: 'C2', position: 9 },
    { note: 'D2', position: 11 },
    { note: 'E2', position: 13 },
    { note: 'F2', position: 14 },
    { note: 'G2', position: 16 },
    { note: 'A3', position: 18 },
    { note: 'B3', position: 20 },
    { note: 'C3', position: 21 },
    { note: 'D3', position: 23 },
    { note: 'E3', position: 25 },

  ];

  const blackKeys = [
    { note: 'F#1', position: 3 },
    { note: 'G#1', position: 5 },
    { note: 'A#2', position: 6 },
    { note: 'C#2', position: 10 },
    { note: 'D#2', position: 12 },
    { note: 'F#2', position: 15 },
    { note: 'G#2', position: 17 },
    { note: 'A#3', position: 19 },
    { note: 'C#3', position: 22 },
    { note: 'D#3', position: 24 },
  ];

  // Map black key notes to the index of their preceding white key
  const blackKeyOffsets: Record<string, number> = {
    'F#1': 1,
    'G#1': 2,
    'A#2': 4,
    'C#2': 5,
    'D#2': 6,
    'F#2': 8,
    'G#2': 9,
    'A#3': 11,
    'C#3': 12,
    'D#3': 13,
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
