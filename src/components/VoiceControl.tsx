import { useEffect, useState } from "react";
import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoiceControlProps {
  onDataReceived: (data: any) => void;
  type: "invoice" | "receipt" | "estimate";
}

export function VoiceControl({ onDataReceived, type }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const conversation = useConversation();

  const startVoiceControl = async () => {
    const apiKey = localStorage.getItem("elevenLabsApiKey");
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your ElevenLabs API key in the settings page.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      
      // Start the conversation with appropriate context
      await conversation.startSession({
        agentId: "custom_agent", // Replace with your agent ID
        overrides: {
          agent: {
            prompt: {
              prompt: `You are a helpful assistant that helps users create ${type}s. 
                      Extract the following information from user's speech:
                      - Client name
                      - Amount
                      - Date
                      - Notes`,
            },
            firstMessage: `I'll help you create a ${type}. Please provide the details.`,
          },
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start voice control. Please check your microphone access.",
        variant: "destructive",
      });
    }
  };

  const stopVoiceControl = async () => {
    setIsListening(false);
    await conversation.endSession();
  };

  useEffect(() => {
    return () => {
      if (isListening) {
        conversation.endSession();
      }
    };
  }, []);

  return (
    <Button
      variant={isListening ? "destructive" : "default"}
      onClick={isListening ? stopVoiceControl : startVoiceControl}
      className="gap-2"
    >
      {isListening ? (
        <>
          <MicOff className="h-4 w-4" /> Stop Voice Control
        </>
      ) : (
        <>
          <Mic className="h-4 w-4" /> Start Voice Control
        </>
      )}
    </Button>
  );
}