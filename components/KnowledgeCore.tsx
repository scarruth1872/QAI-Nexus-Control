// Fix: Replaced placeholder content with a valid React component.
import React, { useState } from 'react';
// Fix: Corrected import paths for services and types.
import { summarizeTextForKnowledgeBase, getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';
// FIX: Corrected import path for types to be a relative module path.
import { AgentChats } from '../types';

interface KnowledgeCoreProps {
    agentChats: AgentChats;
}

const KnowledgeCore: React.FC<KnowledgeCoreProps> = ({ agentChats }) => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<string | null>(null);

    const [knowledgeToAdd, setKnowledgeToAdd] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [addResult, setAddResult] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setIsSearching(true);
        setSearchResult(null);
        setAddResult(null);
        try {
            const res = await getTacticalSuggestion(`Provide a detailed knowledge base entry for: "${query}"`);
            setSearchResult(res);
        } catch (error) {
            setSearchResult("Error querying knowledge base.");
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const processAndAddKnowledge = async (source: string, rawText: string) => {
        if (!rawText.trim()) {
            setAddResult(`Source [${source}] is empty. Nothing to add.`);
            return;
        }
        setIsAdding(true);
        setAddResult(null);
        setSearchResult(null);
        try {
            const res = await summarizeTextForKnowledgeBase(rawText);
            setAddResult(`Successfully added new entry from [${source}]:\n\n${res}`);
        } catch (error) {
            setAddResult(`Error processing knowledge from [${source}].`);
        } finally {
            setIsAdding(false);
        }
    };

    const handleAddFromText = () => {
        processAndAddKnowledge('Text Input', knowledgeToAdd);
        setKnowledgeToAdd('');
    };
    
    const handleDistillHistory = () => {
        // FIX: The original code using `Object.entries` had a type inference issue where
        // the `messages` variable was incorrectly inferred as `unknown`, causing a compile error.
        // Refactoring to `Object.keys` with direct property access ensures correct typing for `messages`.
        const formattedHistory = Object.keys(agentChats)
            .map((agentId) => {
                const messages = agentChats[agentId];
                const agentName = agentId; // In a real app, you'd look up the name
                const conversation = messages.map(msg => `${msg.sender === 'user' ? 'User' : agentName}: ${msg.text}`).join('\n');
                return `--- Conversation with ${agentName} ---\n${conversation}`;
            })
            .join('\n\n');
        processAndAddKnowledge('Chat History', formattedHistory);
    };

    const handleImportDataset = () => {
        const mockDataset = `
        Field Report 7B-Alpha:
        - Anomaly detected at coordinates 123.45, -67.89.
        - Energy signatures consistent with a quantum fluctuation.
        - Spectrometer readings show trace amounts of exotic matter.
        - Recommendation: Send a probe for further analysis. Avoid direct agent contact until probe data is reviewed.
        `;
        processAndAddKnowledge('Field Report Dataset', mockDataset);
    };


    return (
        <div className="module-panel">
            <h3>Knowledge Core</h3>
            <p>Database entries: 1,482,934</p>
            <input 
                type="search" 
                placeholder="Query knowledge base..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSearching || isAdding}
                style={{ width: '100%', backgroundColor: '#000', border: '1px solid var(--lcars-secondary)', color: 'var(--lcars-text)', padding: '0.5rem', borderRadius: '5px' }}
            />
            {isSearching && <Spinner />}
            {searchResult && <div className="module-response" style={{marginTop: '1rem'}}>{searchResult}</div>}

            <div className="knowledge-core-divider" />
            
            <h4>Add to Knowledge Base</h4>
            <div className="knowledge-core-add-section">
                <textarea
                    placeholder="Paste text data here..."
                    value={knowledgeToAdd}
                    onChange={(e) => setKnowledgeToAdd(e.target.value)}
                    disabled={isAdding}
                />
                <div className="knowledge-core-add-actions">
                    <button onClick={handleAddFromText} disabled={isAdding || !knowledgeToAdd.trim()}>Add from Text</button>
                    <button onClick={handleDistillHistory} disabled={isAdding || Object.keys(agentChats).length === 0}>Distill Chat History</button>
                    <button onClick={handleImportDataset} disabled={isAdding}>Import Field Report Dataset</button>
                </div>
            </div>

            {isAdding && <Spinner />}
            {addResult && <div className="module-response" style={{marginTop: '1rem'}}>{addResult}</div>}

        </div>
    );
};

export default KnowledgeCore;