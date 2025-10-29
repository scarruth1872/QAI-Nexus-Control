import React from 'react';

const SensorFusionDisplay: React.FC = () => {
    return (
        <div className="module-panel">
            <h3>Sensor Fusion</h3>
            <div className="sensor-fusion-placeholder">
                <p>Aggregating LiDAR, Depth, and RGB feeds...</p>
                {/* Visual representation would go here */}
            </div>
        </div>
    );
};

export default SensorFusionDisplay;
