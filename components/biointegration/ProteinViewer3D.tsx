import React from 'react';

const ProteinViewer3D: React.FC = () => {
    return (
        <div className="protein-viewer-placeholder">
            <div className="protein-structure">
                {/* Mock 3D structure with CSS */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={`helix-${i}`}
                        className="helix"
                        style={{'--i': i} as React.CSSProperties}
                    />
                ))}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={`sheet-${i}`}
                        className="sheet"
                        style={{'--i': i, transform: `rotateY(calc(var(--i) * 60deg)) translateZ(30px) rotateX(90deg)`} as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProteinViewer3D;
