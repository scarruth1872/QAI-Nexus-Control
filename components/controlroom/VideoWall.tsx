import React from 'react';

const VideoWall: React.FC = () => {
    const feeds = [
        "Main Bay - Gantry Cam",
        "Main Bay - UGV-01 Cam",
        "HRI Lab - Observation",
        "Fabrication - 3D Printer Bay",
        "Electronics - Clean Room",
        "Logistics - Loading Dock"
    ];

    return (
        <div className="module-panel">
            <h3>Video Wall</h3>
            <div className="video-wall-grid">
                {feeds.map(feed => (
                    <div key={feed} className="video-feed">
                        <span className="label">{feed}</span>
                        <span className="live-dot">• LIVE</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoWall;
