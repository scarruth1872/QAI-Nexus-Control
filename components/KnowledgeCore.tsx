// FIX: Full implementation of KnowledgeCore component.
import React, { useState } from 'react';
import { KNOWLEDGE_CORE_DOCUMENT, SkfUpgradeResult } from '../types';
import { runSkfUpgrade } from '../services/geminiService';
import { SkfUpgradeModule } from './SkfUpgradeModule';

const formatDocument = (doc: string) => {
    return doc.split('\n').map((paragraph, index) => {
        const trimmed = paragraph.trim();
        if (trimmed === '') return null;
        // Simple heuristic for headers
        if (trimmed.match(/^\d+\./)) {
            return <h3 key={index} className="text-xl font-bold text-indigo-300 mt-6 mb-2">{trimmed.replace(/^\d+\.\s*/, '')}</h3>;
        }
        if (trimmed.startsWith('- ')) {
             return <li key={index} className="ml-6 text-gray-300">{trimmed.substring(2)}</li>;
        }
        return <p key={index} className="text-gray-300 mb-4">{trimmed}</p>;
    });
};

export const KnowledgeCore: React.FC = () => {
    const [skfResult, setSkfResult] = useState<SkfUpgradeResult | null>(null);
    const [isSkfLoading, setIsSkfLoading] = useState(false);

    const handleInitiateSkfUpgrade = async () => {
        setIsSkfLoading(true);
        setSkfResult(null);
        try {
            const result = await runSkfUpgrade();
            setSkfResult(result);
        } catch (error) {
            console.error("SKF Upgrade failed:", error);
        } finally {
            setIsSkfLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Semantic Knowledge Fabric</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Foundational principles, operational protocols, and ethical governance framework of the QAI Nexus.
                </p>
            </div>
            
            <div className="my-12">
                <SkfUpgradeModule
                    onInitiate={handleInitiateSkfUpgrade}
                    result={skfResult}
                    isLoading={isSkfLoading}
                />
            </div>

            <div className="prose prose-invert prose-sm md:prose-base mx-auto max-w-none text-gray-300 prose-headings:text-indigo-300 prose-strong:text-indigo-200 bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg">
                {formatDocument(KNOWLEDGE_CORE_DOCUMENT)}
            </div>
        </div>
    );
};
