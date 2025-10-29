
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob, ConnectLiveOptions, LiveSession } from '@google/genai';
import { createBlob, blobToBase64, decode, decodeAudioData } from '../../utils/liveUtils';
import { LiveTranscriptionTurn } from '../../types';
import VideoFeed from './VideoFeed';
import TranscriptionDisplay from './TranscriptionDisplay';
import LiveStatusIndicator from './LiveStatusIndicator';
import PhoneCameraConnect from './PhoneCameraConnect';

type ConnectionState = 'IDLE' | 'CONNECTING' | 'ACTIVE' | 'CLOSED' | 'ERROR';
type SessionMode = 'idle' | 'video' | 'audio-only' | 'error';
const FRAME_RATE = 2; // Send 2 frames per second
const JPEG_QUALITY = 0.7;

const LiveCommsView: React.FC = () => {
    const [connectionState, setConnectionState] = useState<ConnectionState>('IDLE');
    const [sessionMode, setSessionMode] = useState<SessionMode>('idle');
    const [transcriptionHistory, setTranscriptionHistory] = useState<LiveTranscriptionTurn[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [currentOutput, setCurrentOutput] = useState('');
    const [isPhoneCamera, setIsPhoneCamera] = useState(false);

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameIntervalRef = useRef<number | null>(null);
    
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const nextStartTimeRef = useRef(0);
    const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

    const currentTurnRef = useRef({ user: '', model: '' });

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    
    const stopFrameStreaming = () => {
        if (frameIntervalRef.current) {
            window.clearInterval(frameIntervalRef.current);
            frameIntervalRef.current = null;
        }
    };

    const handleDisconnect = useCallback(() => {
        stopFrameStreaming();
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => {
                session.close();
            });
            sessionPromiseRef.current = null;
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
            outputAudioContextRef.current.close();
            outputAudioContextRef.current = null;
        }
        nextStartTimeRef.current = 0;
        audioSourcesRef.current.clear();

        setConnectionState('IDLE');
        setSessionMode('idle');
    }, []);
    
    useEffect(() => {
        if (connectionState === 'ACTIVE' && sessionMode === 'video' && !isPhoneCamera) {
            const videoEl = videoRef.current;
            const canvasEl = canvasRef.current;
            if (!videoEl || !canvasEl) return;

            const ctx = canvasEl.getContext('2d');
            if (!ctx) return;

            frameIntervalRef.current = window.setInterval(() => {
                if (videoEl.readyState < 2) return; // Wait for video data to be available
                canvasEl.width = videoEl.videoWidth;
                canvasEl.height = videoEl.videoHeight;
                ctx.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight);
                canvasEl.toBlob(
                    async (blob) => {
                        if (blob && sessionPromiseRef.current) {
                            const base64Data = await blobToBase64(blob);
                            sessionPromiseRef.current.then((session) => {
                              session.sendRealtimeInput({
                                media: { data: base64Data, mimeType: 'image/jpeg' }
                              });
                            });
                        }
                    },
                    'image/jpeg',
                    JPEG_QUALITY
                );
            }, 1000 / FRAME_RATE);

        } else {
            stopFrameStreaming();
        }

        return () => {
            stopFrameStreaming();
        };
    }, [connectionState, sessionMode, isPhoneCamera]);


    const handleConnect = useCallback(async () => {
        setConnectionState('CONNECTING');
        setSessionMode('idle');

        if (!outputAudioContextRef.current || outputAudioContextRef.current.state === 'closed') {
            outputAudioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }

        let stream: MediaStream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            setSessionMode('video');
        } catch (err) {
            console.warn('Could not get video stream, falling back to audio-only:', err);
            try {
                stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setSessionMode('audio-only');
            } catch (audioErr) {
                console.error('Could not get audio stream either:', audioErr);
                setConnectionState('ERROR');
                setSessionMode('error');
                alert("Could not access microphone. Please check permissions and ensure it's not in use.");
                return;
            }
        }
        
        mediaStreamRef.current = stream;

        const connectOptions: ConnectLiveOptions = {
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            callbacks: {
                onopen: () => {
                    console.debug('Live session opened');
                    setConnectionState('ACTIVE');
                    
                    const context = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                    audioContextRef.current = context;
                    
                    const source = context.createMediaStreamSource(stream);
                    const scriptProcessor = context.createScriptProcessor(4096, 1, 1);
                    scriptProcessorRef.current = scriptProcessor;

                    scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);
                        sessionPromiseRef.current?.then((session) => {
                            session.sendRealtimeInput({ media: pcmBlob });
                        });
                    };
                    source.connect(scriptProcessor);
                    scriptProcessor.connect(context.destination);
                },
                onmessage: async (message: LiveServerMessage) => {
                    if (message.serverContent?.outputTranscription) {
                        const text = message.serverContent.outputTranscription.text;
                        currentTurnRef.current.model += text;
                        setCurrentOutput(prev => prev + text);
                    } else if (message.serverContent?.inputTranscription) {
                        const text = message.serverContent.inputTranscription.text;
                        currentTurnRef.current.user += text;
                        setCurrentInput(prev => prev + text);
                    }

                    if (message.serverContent?.turnComplete) {
                        setTranscriptionHistory(prev => [...prev, currentTurnRef.current]);
                        currentTurnRef.current = { user: '', model: '' };
                        setCurrentInput('');
                        setCurrentOutput('');
                    }

                    const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                    const outputAudioContext = outputAudioContextRef.current;

                    if (base64EncodedAudioString && outputAudioContext) {
                        nextStartTimeRef.current = Math.max(
                            nextStartTimeRef.current,
                            outputAudioContext.currentTime,
                        );
                        
                        const audioBuffer = await decodeAudioData(
                            decode(base64EncodedAudioString),
                            outputAudioContext,
                            24000,
                            1,
                        );

                        const source = outputAudioContext.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(outputAudioContext.destination);

                        source.addEventListener('ended', () => {
                            audioSourcesRef.current.delete(source);
                        });

                        source.start(nextStartTimeRef.current);
                        nextStartTimeRef.current = nextStartTimeRef.current + audioBuffer.duration;
                        audioSourcesRef.current.add(source);
                    }

                    const interrupted = message.serverContent?.interrupted;
                    if (interrupted) {
                        for (const source of audioSourcesRef.current.values()) {
                            source.stop();
                            audioSourcesRef.current.delete(source);
                        }
                        nextStartTimeRef.current = 0;
                    }

                },
                onerror: (e: ErrorEvent) => {
                    console.error('Live session error:', e);
                    setConnectionState('ERROR');
                    handleDisconnect();
                },
                onclose: (e: CloseEvent) => {
                    console.debug('Live session closed');
                    setConnectionState('CLOSED');
                    handleDisconnect();
                },
            },
            config: {
                responseModalities: [Modality.AUDIO],
                outputAudioTranscription: {},
                inputAudioTranscription: {},
            }
        };

        sessionPromiseRef.current = ai.live.connect(connectOptions);

    }, [ai, handleDisconnect]);

    useEffect(() => {
        return () => {
            handleDisconnect();
        }
    }, [handleDisconnect]);

    return (
        <div className="live-comms-grid">
            <div className="live-video-main">
                <VideoFeed 
                    ref={videoRef}
                    isPhoneCamera={isPhoneCamera} 
                    stream={mediaStreamRef.current}
                    sessionMode={sessionMode}
                />
            </div>
            <div className="live-sidebar">
                <div className="module-panel">
                    <h3>Connection Status</h3>
                    <LiveStatusIndicator state={connectionState} />
                     <div className="live-controls">
                        {connectionState !== 'ACTIVE' && connectionState !== 'CONNECTING' ? (
                            <button onClick={handleConnect}>Open Live Channel</button>
                        ) : (
                            <button onClick={handleDisconnect} className="disconnect">Close Channel</button>
                        )}
                    </div>
                </div>
                 <div className="module-panel">
                    <PhoneCameraConnect onToggle={setIsPhoneCamera} isActive={isPhoneCamera} />
                 </div>
            </div>
            <div className="live-transcription">
                 <TranscriptionDisplay history={transcriptionHistory} currentInput={currentInput} currentOutput={currentOutput} />
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default LiveCommsView;
