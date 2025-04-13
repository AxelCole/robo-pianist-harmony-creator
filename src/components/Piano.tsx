
import PianoKey from "./PianoKey";

interface PianoProps {
  onNoteSelected: (position: number) => void;
}

const Piano = ({ onNoteSelected }: PianoProps) => {
  // Define the piano layout based on the standard piano keyboard
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
      <div className="absolute flex z-10 top-0">
        <div className="flex">
          {/* First octave black keys - C# and D# */}
          <div className="relative" style={{ left: '9px' }}>
            <PianoKey note={blackKeys[0].note} position={blackKeys[0].position} isBlack onKeyPress={handleKeyPress} />
          </div>
          <div className="relative" style={{ left: '23px' }}>
            <PianoKey note={blackKeys[1].note} position={blackKeys[1].position} isBlack onKeyPress={handleKeyPress} />
          </div>
        </div>
        
        {/* Gap for E */}
        <div className="w-14"></div>
        
        {/* First octave black keys - F#, G#, A# */}
        <div className="flex">
          <div className="relative" style={{ left: '-14px' }}>
            <PianoKey note={blackKeys[2].note} position={blackKeys[2].position} isBlack onKeyPress={handleKeyPress} />
          </div>
          <div className="relative" style={{ left: '0px' }}>
            <PianoKey note={blackKeys[3].note} position={blackKeys[3].position} isBlack onKeyPress={handleKeyPress} />
          </div>
          <div className="relative" style={{ left: '14px' }}>
            <PianoKey note={blackKeys[4].note} position={blackKeys[4].position} isBlack onKeyPress={handleKeyPress} />
          </div>
        </div>
        
        {/* Gap for B */}
        <div className="w-14"></div>
        
        {/* Second octave black keys - C# and D# */}
        <div className="flex">
          <div className="relative" style={{ left: '-14px' }}>
            <PianoKey note={blackKeys[5].note} position={blackKeys[5].position} isBlack onKeyPress={handleKeyPress} />
          </div>
          <div className="relative" style={{ left: '0px' }}>
            <PianoKey note={blackKeys[6].note} position={blackKeys[6].position} isBlack onKeyPress={handleKeyPress} />
          </div>
        </div>
        
        {/* Gap for E */}
        <div className="w-14"></div>
        
        {/* Second octave black keys - F#, G#, A# */}
        <div className="flex">
          <div className="relative" style={{ left: '-14px' }}>
            <PianoKey note={blackKeys[7].note} position={blackKeys[7].position} isBlack onKeyPress={handleKeyPress} />
          </div>
          <div className="relative" style={{ left: '0px' }}>
            <PianoKey note={blackKeys[8].note} position={blackKeys[8].position} isBlack onKeyPress={handleKeyPress} />
          </div>
          <div className="relative" style={{ left: '14px' }}>
            <PianoKey note={blackKeys[9].note} position={blackKeys[9].position} isBlack onKeyPress={handleKeyPress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piano;
