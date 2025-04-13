
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PianoKeyProps {
  note: string;
  position: number;
  isBlack?: boolean;
  onKeyPress: (position: number) => void;
}

const PianoKey = ({ note, position, isBlack = false, onKeyPress }: PianoKeyProps) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleKeyPress = () => {
    setIsPressed(true);
    onKeyPress(position);
    
    setTimeout(() => {
      setIsPressed(false);
    }, 300);
  };

  return (
    <div
      className={cn(
        "relative transition-all duration-200 select-none cursor-pointer",
        isBlack 
          ? "bg-piano-black z-10 h-28 w-10 mx-[-5px]" 
          : "bg-piano-white border-[1px] border-gray-300 h-44 w-14"
      )}
      style={{
        '--key-color': isBlack ? '#222222' : '#FFFFFF',
        '--key-pressed': isBlack ? '#000000' : '#e6e6e6',
      } as React.CSSProperties}
      onClick={handleKeyPress}
    >
      <div 
        className={cn(
          "absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium",
          isBlack ? "text-white" : "text-gray-700",
          isPressed && "animate-key-press"
        )}
      >
        {note}
      </div>
      {isPressed && (
        <div 
          className={cn(
            "absolute inset-0 bg-piano-blue bg-opacity-20",
            isBlack ? "bg-opacity-30" : "bg-opacity-20"
          )}
        />
      )}
    </div>
  );
};

export default PianoKey;
