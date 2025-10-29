import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { OmicsData } from '../../types';

const initialData: OmicsData[] = [
    { id: 'gen-001', type: 'Genomics', dataset: 'Human Genome Set 7B', status: 'Processed' },
    { id: 'prot-004', type: 'Proteomics', dataset: 'Plasma Protein Map 4F', status: 'Analyzing' },
    // Fix: Changed status from 'Pending' to 'PENDING' to match the Status type.
    { id: 'meta-002', type: 'Metabolomics', dataset: 'Cellular Respiration Pathways', status: 'PENDING' },
];

const OmicsDataPlatforms: React.FC = () => {
    return (
        <div className="module-panel bio-module">
            <h3>Omics Data Platforms</h3>
            <table className="quantum-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Dataset</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {initialData.map(data => (
                        <tr key={data.id}>
                            <td>{data.type}</td>
                            <td>{data.dataset}</td>
                            <td className={`status-${data.status.toLowerCase()}`}>{data.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OmicsDataPlatforms;