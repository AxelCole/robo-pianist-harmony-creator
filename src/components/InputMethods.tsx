
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Mic, Camera, Upload, Play, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputMethodsProps {
  onAddNotes: (positions: number[]) => void;
}

const InputMethods = ({ onAddNotes }: InputMethodsProps) => {
  const { toast } = useToast();
  const [activeInput, setActiveInput] = useState<"none" | "mic" | "camera" | "upload">("none");
  const [inputText, setInputText] = useState("");

  const handleUploadClick = () => {
    setActiveInput("upload");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // In a real app, this would process the MP3 file
      // Here we're just simulating with a random array
      toast({
        title: "File received",
        description: `Processing ${file.name}...`,
      });
      
      // Simulated result - in a real app this would come from audio processing
      setTimeout(() => {
        const randomPositions = Array.from(
          { length: 5 + Math.floor(Math.random() * 10) },
          () => 1 + Math.floor(Math.random() * 25)
        );
        onAddNotes(randomPositions);
        toast({
          title: "File processed",
          description: `Generated ${randomPositions.length} notes`,
        });
        setActiveInput("none");
      }, 1500);
    }
  };

  const handleMicrophoneClick = () => {
    if (activeInput === "mic") {
      // Stop recording
      setActiveInput("none");
      toast({
        title: "Microphone stopped",
        description: "Processing your audio input...",
      });
      
      // Simulate processing
      setTimeout(() => {
        const notes = inputText.split(",").map(note => note.trim());
        const positions = convertNotesToPositions(notes);
        onAddNotes(positions);
        setInputText("");
      }, 1000);
    } else {
      // Start recording
      setActiveInput("mic");
      setInputText("");
      toast({
        title: "Microphone active",
        description: "Say your notes (e.g. 'C1, E1, G1') and click again to stop",
      });
    }
  };

  const handleCameraClick = () => {
    if (activeInput === "camera") {
      // Stop camera
      setActiveInput("none");
      toast({
        title: "Camera stopped",
        description: "Processing your visual input...",
      });
      
      // Simulate processing
      setTimeout(() => {
        const notes = inputText.split(",").map(note => note.trim());
        const positions = convertNotesToPositions(notes);
        onAddNotes(positions);
        setInputText("");
      }, 1000);
    } else {
      // Start camera
      setActiveInput("camera");
      setInputText("");
      toast({
        title: "Camera active",
        description: "Show your notes on paper to the camera and click again to capture",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handlePlayInput = () => {
    const notes = inputText.split(",").map(note => note.trim());
    
    if (notes.length > 0 && notes[0] !== "") {
      const positions = convertNotesToPositions(notes);
      onAddNotes(positions);
      setInputText("");
      setActiveInput("none");
      
      toast({
        title: "Notes processed",
        description: `Added ${notes.length} notes to the sequence`,
      });
    }
  };

  const convertNotesToPositions = (notes: string[]): number[] => {
    // Note to position mapping
    const noteMap: Record<string, number> = {
      "C1": 1, "C#1": 2, "D1": 3, "D#1": 4, "E1": 5, "F1": 6, "F#1": 7, 
      "G1": 8, "G#1": 9, "A1": 10, "A#1": 11, "B1": 12,
      "C2": 13, "C#2": 14, "D2": 15, "D#2": 16, "E2": 17, "F2": 18, "F#2": 19,
      "G2": 20, "G#2": 21, "A2": 22, "A#2": 23, "B2": 24, "C3": 25
    };
    
    // Convert each note to its position
    return notes
      .map(note => noteMap[note])
      .filter(position => position !== undefined);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-center gap-4 mb-6">
        <Button 
          onClick={handleUploadClick} 
          variant="outline"
          className={cn("gap-2", activeInput === "upload" && "bg-piano-blue text-white")}
        >
          <Upload size={18} /> Upload MP3
        </Button>
        <Button 
          onClick={handleMicrophoneClick} 
          variant="outline"
          className={cn("gap-2", activeInput === "mic" && "bg-piano-blue text-white")}
        >
          <Mic size={18} /> Microphone
        </Button>
        <Button 
          onClick={handleCameraClick} 
          variant="outline"
          className={cn("gap-2", activeInput === "camera" && "bg-piano-blue text-white")}
        >
          <Camera size={18} /> Camera
        </Button>
      </div>
      
      {activeInput !== "none" && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type={activeInput === "upload" ? "file" : "text"}
            accept={activeInput === "upload" ? "audio/mp3" : undefined}
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-piano-blue"
            onChange={activeInput === "upload" ? handleFileChange : handleInputChange}
            value={activeInput === "upload" ? undefined : inputText}
            placeholder={
              activeInput === "mic" 
                ? "Say your notes (e.g. C1, E1, G1)" 
                : activeInput === "camera" 
                ? "Notes detected from camera will appear here" 
                : ""
            }
          />
          
          {activeInput !== "upload" && (
            <Button 
              onClick={handlePlayInput}
              disabled={!inputText.length}
              className="gap-2"
            >
              <Play size={16} /> Process
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveInput("none")}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default InputMethods;
