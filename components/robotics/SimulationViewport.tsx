import React from 'react';

const SimulationViewport: React.FC = () => {
    return (
        <div className="module-panel">
            <h3>Simulation Viewport</h3>
            <div className="simulation-viewport-placeholder">
                <p>Digital twin of robotics bay is active.</p>
                {/* 3D rendering would go here */}
            </div>
        </div>
    );
};

export default SimulationViewport;
