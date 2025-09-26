import React, { useState } from 'react';
import Spinner from '../Spinner';
import { getBioAssaySuggestion, getProteinFoldingSuggestion } from '../../services/geminiService';
import { BioAssayResult, ProteinFoldingResult } from '../../types';
import ProteinViewer3D from './ProteinViewer3D';


const ComputationalBiologyLab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'gene' | 'protein'>('gene');

    // State for Gene Analysis
    const [genePrompt, setGenePrompt] = useState('Analyze the provided gene sequence for potential links to accelerated cellular regeneration.');
    const [isGeneLoading, setIsGeneLoading] = useState(false);
    const [geneResult, setGeneResult] = useState<BioAssayResult | null>(null);
    const [geneError, setGeneError] = useState<string | null>(null);

    // State for Protein Folding
    const [proteinPrompt, setProteinPrompt] = useState('P53 Suppressor Protein');
    const [isProteinLoading, setIsProteinLoading] = useState(false);
    const [proteinResult, setProteinResult] = useState<ProteinFoldingResult | null>(null);
    const [proteinError, setProteinError] = useState<string | null>(null);


    const handleRunGeneAnalysis = async () => {
        if (!genePrompt.trim()) return;
        setIsGeneLoading(true);
        setGeneResult(null);
        setGeneError(null);
        try {
            const res = await getBioAssaySuggestion(genePrompt);
            setGeneResult(res);
        } catch (err) {
            console.error(err);
            setGeneError("Failed to run bio-assay analysis. The AI core may be offline or the request is invalid.");
        } finally {
            setIsGeneLoading(false);
        }
    };

    const handleRunProteinFolding = async () => {
        if (!proteinPrompt.trim()) return;
        setIsProteinLoading(true);
        setProteinResult(null);
        setProteinError(null);
        try {
            const res = await getProteinFoldingSuggestion(proteinPrompt);
            setProteinResult(res);
        } catch (err) {
            console.error(err);
            setProteinError("Failed to run protein folding simulation. The AI core may be offline or the request is invalid.");
        } finally {
            setIsProteinLoading(false);
        }
    };


    return (
        <div className="module-panel bio-module">
            <h3>Computational Biology Lab</h3>
            
            <div className="view-toggle">
                <button onClick={() => setActiveTab('gene')} className={activeTab === 'gene' ? 'active' : ''}>Gene Analysis</button>
                <button onClick={() => setActiveTab('protein')} className={activeTab === 'protein' ? 'active' : ''}>Quantum Protein Folding</button>
            </div>

            {activeTab === 'gene' && (
                <div className="mt-4">
                    <p>Run complex bioinformatics analyses by providing a research prompt.</p>
                    <textarea
                        value={genePrompt}
                        onChange={(e) => setGenePrompt(e.target.value)}
                        placeholder="e.g., Test biocompatibility of a new nanomaterial..."
                        disabled={isGeneLoading}
                        style={{ minHeight: '80px' }}
                    />
                    <button onClick={handleRunGeneAnalysis} disabled={isGeneLoading || !genePrompt.trim()}>
                        {isGeneLoading ? 'Analyzing...' : `Run Gene Analysis`}
                    </button>
                    {isGeneLoading && <Spinner />}
                    {geneError && <div className="module-response mt-2" style={{color: 'var(--status-error)'}}>{geneError}</div>}
                    {geneResult && (
                        <div className="mt-2 module-response">
                            <h4>Analysis Complete</h4>
                            <p><strong>Biocompatibility:</strong> {geneResult.biocompatibility.assessment} - {geneResult.biocompatibility.notes}</p>
                             <p><strong>Computational Analysis:</strong> {geneResult.computationalAnalysis}</p>
                            <div className="mt-4">
                                <h4>Optimized Biological Protocol</h4>
                                 <table className="protocol-table">
                                    <thead>
                                        <tr><th>Step</th><th>Action</th><th>Duration</th><th>Reagents</th></tr>
                                    </thead>
                                    <tbody>
                                        {geneResult.biologicalProtocol.map(step => (
                                            <tr key={step.step}>
                                                <td>{step.step}</td>
                                                <td>{step.action}</td>
                                                <td>{step.duration}</td>
                                                <td>{step.reagents.join(', ')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                 </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'protein' && (
                <div className="mt-4">
                    <p>Simulate protein folding using quantum-inspired algorithms to predict structure and function.</p>
                     <textarea
                        value={proteinPrompt}
                        onChange={(e) => setProteinPrompt(e.target.value)}
                        placeholder="Enter target protein name, e.g., Insulin Receptor..."
                        disabled={isProteinLoading}
                    />
                    <button onClick={handleRunProteinFolding} disabled={isProteinLoading || !proteinPrompt.trim()}>
                        {isProteinLoading ? 'Simulating...' : `Run Folding Simulation`}
                    </button>
                    {isProteinLoading && <Spinner />}
                    {proteinError && <div className="module-response mt-2" style={{color: 'var(--status-error)'}}>{proteinError}</div>}
                    {proteinResult && (
                         <div className="mt-2">
                             <ProteinViewer3D />
                             <div className="module-response">
                                <h4>Folding Simulation Complete</h4>
                                <p><strong>Target:</strong> {proteinResult.targetProtein}</p>
                                <p><strong>Structure:</strong> {proteinResult.predictedStructure}</p>
                                <p><strong>Binding Affinity:</strong> {proteinResult.bindingAffinity}</p>
                                <p><strong>Therapeutic Potential:</strong> {proteinResult.therapeuticPotential}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ComputationalBiologyLab;
