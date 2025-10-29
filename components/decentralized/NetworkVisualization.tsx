import React, { useEffect, useRef } from 'react';

const NetworkVisualization: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set the canvas drawing surface size to match its displayed size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        let animationFrameId: number;
        const nodes = [...Array(50)].map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
            radius: Math.random() * 2 + 1,
        }));

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#99ccff';

            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="module-panel" style={{ height: '100%' }}>
            <h3>Network Visualization</h3>
            <canvas ref={canvasRef} style={{ width: '100%', height: 'calc(100% - 40px)' }}></canvas>
        </div>
    );
};

export default NetworkVisualization;