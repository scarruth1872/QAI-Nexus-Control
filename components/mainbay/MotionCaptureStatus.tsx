import React from 'react';
import { MainBayState } from '../../types';

interface MotionCaptureStatusProps {
    status: MainBayState['motionCapture'];
}

const MotionCaptureStatus: React.FC<MotionCaptureStatusProps> = ({ status }) => {
    return (
        <div className="module-panel">
            <h3>Motion Capture</h3>
            <p>System Status: {status.status}</p>
            <p>Tracking Accuracy: {status.accuracy * 100}%</p>
        </div>
    );
};

export default MotionCaptureStatus;
