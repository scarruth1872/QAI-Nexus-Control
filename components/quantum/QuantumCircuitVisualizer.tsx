import React from 'react';

interface QuantumCircuitVisualizerProps {
    circuitString: string;
}

const QuantumCircuitVisualizer: React.FC<QuantumCircuitVisualizerProps> = ({ circuitString }) => {
    return (
        <div className="circuit-visualizer">
            <pre>
                {circuitString}
            </pre>
        </div>
    );
};

export default QuantumCircuitVisualizer;
