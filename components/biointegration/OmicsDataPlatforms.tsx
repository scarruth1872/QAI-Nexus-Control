import React from 'react';
import { OmicsData } from '../../types';

const initialData: OmicsData[] = [
    { id: 'gen-001', type: 'Genomics', dataset: 'Human Genome Set 7B', status: 'Processed' },
    { id: 'prot-004', type: 'Proteomics', dataset: 'Plasma Protein Map 4F', status: 'Analyzing' },
    { id: 'meta-002', type: 'Metabolomics', dataset: 'Cellular Respiration Pathways', status: 'Pending' },
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
