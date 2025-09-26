import React, { useState, useEffect } from 'react';

const DltNetworkMonitor: React.FC = () => {
    const [stats, setStats] = useState({
        nodes: 128,
        tps: 4500,
        health: 'Optimal',
        latency: 15,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                tps: Math.floor(4000 + Math.random() * 1000),
                latency: 12 + Math.random() * 6
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="module-panel">
            <h3>DLT Network Monitor</h3>
            <div className="logistics-overview-grid">
                <div className="logistics-metric">
                    <div className="value">{stats.nodes}</div>
                    <div className="label">Active Nodes</div>
                </div>
                <div className="logistics-metric">
                    <div className="value">{stats.tps.toLocaleString()}</div>
                    <div className="label">Transactions/Sec</div>
                </div>
                <div className="logistics-metric">
                    <div className={`value comms-secure`}>{stats.health}</div>
                    <div className="label">Network Health</div>
                </div>
                <div className="logistics-metric">
                    <div className="value">{stats.latency.toFixed(2)}ms</div>
                    <div className="label">Avg. Latency</div>
                </div>
            </div>
        </div>
    );
};

export default DltNetworkMonitor;