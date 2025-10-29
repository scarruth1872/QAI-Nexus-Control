import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

type SessionMode = 'idle' | 'video' | 'audio-only' | 'error';

interface VideoFeedProps {
    isPhoneCamera: boolean;
    stream: MediaStream | null;
    sessionMode: SessionMode;
}

const VideoFeed = forwardRef<HTMLVideoElement, VideoFeedProps>(({ isPhoneCamera, stream, sessionMode }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);
    
    useEffect(() => {
        if (videoRef.current && stream && sessionMode === 'video') {
            videoRef.current.srcObject = stream;
        } else if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, [stream, sessionMode]);

    const renderContent = () => {
        if (isPhoneCamera) {
            return (
                <div className="phone-placeholder">
                    <p>Receiving video from external device...</p>
                </div>
            );
        }
        switch (sessionMode) {
            case 'video':
                return <video ref={videoRef} autoPlay playsInline muted className="live-video" />;
            case 'audio-only':
                return (
                    <div className="video-error-message">
                        <h3>Audio-Only Mode</h3>
                        <p>Camera not found or access was denied.</p>
                    </div>
                );
            case 'error':
                 return (
                    <div className="video-error-message">
                        <h3>Connection Failed</h3>
                        <p>Could not access microphone. Please check permissions.</p>
                    </div>
                 );
            case 'idle':
            default:
                 return (
                    <div className="phone-placeholder">
                        <p>Live channel is offline.</p>
                    </div>
                 );
        }
    };

    return (
        <div className="module-panel video-feed-container">
            <h3>Live Video Feed</h3>
            <div className="video-wrapper">
               {renderContent()}
            </div>
        </div>
    );
});

export default VideoFeed;