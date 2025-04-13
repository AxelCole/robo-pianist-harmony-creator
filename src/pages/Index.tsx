
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Piano from "@/components/Piano";
import InputMethods from "@/components/InputMethods";
import NoteVisualizer from "@/components/NoteVisualizer";

const Index = () => {
  const [robotInstructions, setRobotInstructions] = useState<number[]>([]);
  const { toast } = useToast();

  const handleNoteSelected = (position: number) => {
    setRobotInstructions(prev => [...prev, position]);
  };

  const handleAddNotes = (positions: number[]) => {
    setRobotInstructions(prev => [...prev, ...positions]);
  };

  const handleClearNotes = () => {
    setRobotInstructions([]);
    toast({
      title: "Notes cleared",
      description: "All robot instructions have been cleared",
    });
  };

  const handleSendToRobot = () => {
    console.log("Sending instructions to robot:", robotInstructions);
    // In a real app, this would communicate with the robot API
    // For now, we'll just clear the instructions to simulate completion
    setTimeout(() => {
      setRobotInstructions([]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Robo-Pianist Harmony Creator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create beautiful music for your robot pianist by playing on the virtual keyboard,
          uploading an MP3, or using your microphone or camera.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-10">
          <InputMethods onAddNotes={handleAddNotes} />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-10">
          <Piano onNoteSelected={handleNoteSelected} />
        </section>

        <section>
          <NoteVisualizer 
            notes={robotInstructions} 
            onClear={handleClearNotes} 
            onSend={handleSendToRobot} 
          />
        </section>
      </main>

      <footer className="max-w-5xl mx-auto text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Robo-Pianist Harmony Creator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
