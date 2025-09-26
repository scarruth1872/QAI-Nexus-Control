import React, { useState, useEffect, useRef } from 'react';

const EventStreamVisualizer: React.FC = () => {
    const [spikes, setSpikes] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            
            const newSpike = {
                id: Date.now() + Math.random(),
                startX: 0,
                startY: Math.random() * height,
                endX: width,
                endY: Math.random() * height,
            };
            setSpikes(prev => [...prev.slice(-100), newSpike]);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="module-panel" style={{ height: '100%' }}>
            <h3>Live Event Stream</h3>
            <div className="event-stream-visualizer" ref={containerRef}>
                {spikes.map(spike => (
                    <div 
                        key={spike.id} 
                        className="event-spike" 
                        style={{
                            top: `${spike.startY}px`,
                            left: `${spike.startX}px`,
                            '--start-x': spike.startX,
                            '--start-y': spike.startY,
                            '--end-x': spike.endX,
                            '--end-y': spike.endY,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventStreamVisualizer;