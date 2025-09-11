import React from 'react';

const archivedMissions = [
    { id: 'M79-BETA', objective: "Implement a task-graph based, multi-criteria agent allocation system to optimize mission planning.", status: 'Failed' },
    { id: 'M78-ALPHA', objective: 'Validate quantum-gravity resonance theory using stellar nursery data.', status: 'Success' },
    { id: 'M77-GAMMA', objective: 'Model and mitigate the socio-economic impact of automated asteroid mining.', status: 'Success' },
    { id: 'M76-DELTA', objective: 'Establish a self-sustaining hydroponics protocol for the Martian colony.', status: 'Success' },
    { id: 'M75-EPSILON', objective: 'Analyze deep space transmissions for non-human intelligence signatures.', status: 'Terminated - Anomaly' },
];

export const MissionArchive: React.FC = () => {
    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Mission Archives</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    A record of all past grand missions undertaken by the Nexus Agent system.
                </p>
            </div>

            <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg shadow-lg backdrop-blur-sm">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-indigo-300 uppercase bg-gray-900/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Mission ID</th>
                            <th scope="col" className="px-6 py-3">Objective</th>
                            <th scope="col" className="px-6 py-3">Final Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {archivedMissions.map((mission, index) => (
                            <tr key={mission.id} className="border-b border-indigo-500/10 hover:bg-gray-800/40">
                                <th scope="row" className="px-6 py-4 font-mono font-medium text-white whitespace-nowrap">{mission.id}</th>
                                <td className="px-6 py-4">{mission.objective}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 font-semibold rounded-full text-xs ${
                                        mission.status === 'Success' ? 'bg-green-500/20 text-green-300' : 'bg-rose-500/20 text-rose-300'
                                    }`}>
                                        {mission.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};