
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NoteVisualizerProps {
  notes: number[];
  onClear: () => void;
  onSend: () => void;
}

const NoteVisualizer = ({ notes, onClear, onSend }: NoteVisualizerProps) => {
  const { toast } = useToast();

  const handleSend = () => {
    if (notes.length === 0) {
      toast({
        title: "No notes to send",
        description: "Please add some notes first",
        variant: "destructive",
      });
      return;
    }
    
    onSend();
    toast({
      title: "Instructions sent!",
      description: `Sent ${notes.length} position instructions to the robot`,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Generated Robot Instructions</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onClear}
            disabled={notes.length === 0}
            className="text-sm"
          >
            Clear All
          </Button>
          <Button 
            onClick={handleSend}
            disabled={notes.length === 0}
            className="gap-2"
          >
            <Send size={16} /> Send to Robot
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 min-h-20 overflow-x-auto">
        {notes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {notes.map((note, index) => (
              <div 
                key={index} 
                className="bg-piano-blue text-white px-3 py-1 rounded-full text-sm flex items-center justify-center"
              >
                {note}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No notes added yet. Use the piano keyboard or input methods above.</p>
        )}
      </div>
    </div>
  );
};

export default NoteVisualizer;
