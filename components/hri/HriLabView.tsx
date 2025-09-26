import React from 'react';
import { HriLabState } from '../../types';

interface HriLabViewProps {
    hriState: HriLabState;
}

const HriLabView: React.FC<HriLabViewProps> = ({ hriState }) => {
    return (
        <div className="zonal-view-grid">
            <div className="module-panel">
                <h3>Ambient Conditions</h3>
                <p>Noise Level: {hriState.ambience.noiseLevel} dB</p>
                <p>Lighting: {hriState.ambience.lighting}</p>
            </div>
            <div className="module-panel">
                <h3>Biometric Sensors</h3>
                <p>System Status: {hriState.biometrics.status}</p>
                 <button disabled={hriState.biometrics.status === 'Active'} className="mt-2">Activate</button>
            </div>
            <div className="module-panel">
                <h3>User Session</h3>
                <p>Status: {hriState.session.status}</p>
                <p>Participants: {hriState.session.participants}</p>
            </div>
             <div className="module-panel">
                <h3>Observation Room</h3>
                <div className="video-feed h-full">
                    <span className="label">LIVE FEED</span>
                </div>
            </div>
        </div>
    );
};

export default HriLabView;
