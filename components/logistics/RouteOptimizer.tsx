import React, { useState } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Shipment } from '../../types';
import { getLogisticsRerouteSuggestion } from '../../services/geminiService';
import Spinner from '../Spinner';

interface RouteOptimizerProps {
    shipments: Shipment[];
}

const RouteOptimizer: React.FC<RouteOptimizerProps> = ({ shipments }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<string | null>(null);

    const handleSuggestReroute = async (shipment: Shipment) => {
        setIsLoading(true);
        setSuggestion(null);
        try {
            const res = await getLogisticsRerouteSuggestion(shipment);
            setSuggestion(res);
        } catch (error) {
            setSuggestion(`Error generating suggestion for ${shipment.id}.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="route-optimizer">
            <div className="route-list">
                {shipments.filter(s => s.status !== 'DELIVERED').map(s => (
                    <div key={s.id} className="route-item">
                        <span>{s.id}: {s.origin} → {s.destination}</span>
                        {s.status === 'DELAYED' && (
                            <>
                                <span className="status-delayed ml-2">[DELAYED]</span>
                                <button
                                    onClick={() => handleSuggestReroute(s)}
                                    disabled={isLoading}
                                    className="text-xs p-1 ml-2"
                                >
                                    Suggest Reroute
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            {isLoading && <Spinner />}
            {suggestion && <div className="module-response mt-2">{suggestion}</div>}
        </div>
    );
};

export default RouteOptimizer;