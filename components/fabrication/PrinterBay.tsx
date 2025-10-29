import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Printer } from '../../types';

interface PrinterBayProps {
    printers: Printer[];
}

const PrinterBay: React.FC<PrinterBayProps> = ({ printers }) => {
    return (
        <div className="module-panel">
            <h3>3D Printer Bay</h3>
            {printers.map(p => (
                <div key={p.id} className="mb-4">
                    <div className="machine-status">
                        <div className="status-indicator">
                            <span>{p.id} ({p.type})</span>
                            <span className={`status-${p.status.toLowerCase()}`}>{p.status}</span>
                        </div>
                        <p className="job">Job: {p.job}</p>
                    </div>
                    {p.status === 'Printing' && (
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${p.progress}%` }}></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PrinterBay;