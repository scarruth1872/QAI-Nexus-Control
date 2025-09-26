// Fix: Replaced placeholder content with a valid React component.
import React, { useState, useRef, useEffect } from 'react';
// Fix: Corrected import path for Icons.
import { MicrophoneIcon, StopCircleIcon } from './Icons';

interface MissionInputProps {
  onSubmit: (objective: string) => void;
  isLoading: boolean;
}

const MissionInput: React.FC<MissionInputProps> = ({ onSubmit, isLoading }) => {
  const [objective, setObjective] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Fix: Cast window to `any` to access browser-specific SpeechRecognition APIs.
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        // For this simple case, we'll just append the final transcript
        if (finalTranscript) {
          setObjective(prev => (prev ? prev + ' ' : '') + finalTranscript.trim());
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported by your browser.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (objective.trim() && !isLoading) {
      onSubmit(objective.trim());
      setObjective('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mission-input-form">
      <textarea
        value={objective}
        onChange={(e) => setObjective(e.target.value)}
        placeholder="Enter mission objective..."
        disabled={isLoading}
      />
      <div className="controls">
        <button type="submit" disabled={isLoading || !objective.trim()}>
          {isLoading ? 'Generating Plan...' : 'Initiate Mission'}
        </button>
        {recognitionRef.current && (
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`voice-btn ${isRecording ? 'recording' : ''}`}
            title={isRecording ? 'Stop Recording' : 'Start Recording'}
            disabled={isLoading}
          >
            {isRecording ? <StopCircleIcon /> : <MicrophoneIcon />}
          </button>
        )}
      </div>
    </form>
  );
};

export default MissionInput;