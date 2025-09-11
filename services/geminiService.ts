
import { GoogleGenAI, Type, Chat } from "@google/genai";
import {
    AgentType,
    ProbeType,
    Mission,
    StrategicAdvice,
    SkfUpgradeResult,
    DGMOptimization,
    QuantumRefinementResult,
    DraaUpgradeResult,
    SelfEvolvingAlgorithmResult,
    QuantumSecurityUpgradeResult,
    NeuromorphicIntegrationResult,
    ResilienceAnalysis,
    EthicalAnalysis,
    XaiAnalysisResult,
    GenerativeSimulationResult,
    MarlTrainingResult,
    CognitiveSynthesisResult,
} from "../types";

// Always use new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

// Helper to parse JSON, with a fallback
const parseJson = <T>(jsonString: string, fallback: T): T => {
    try {
        const cleanedString = jsonString.replace(/^```json\s*/, '').replace(/```$/, '');
        return JSON.parse(cleanedString);
    } catch (e) {
        console.error("Failed to parse JSON:", e, "Raw string:", jsonString);
        return fallback;
    }
};

const callGenerativeModel = async <T>(prompt: string, schema: object, fallback: T): Promise<T> => {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });
    return parseJson<T>(response.text, fallback);
};


export async function initiateMission(missionText: string): Promise<Partial<Mission>> {
    const prompt = `Based on the following mission objective, generate a detailed mission plan.
        Objective: "${missionText}"
        Provide a JSON response. Agent types must be one of: "Scientific Discovery", "Societal Modeling", "Planetary Exploration". Step statuses must initially be "pending".`;
    
    return callGenerativeModel<Partial<Mission>>(prompt, {
        type: Type.OBJECT,
        properties: {
            objective: { type: Type.STRING },
            agents: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        type: { type: Type.STRING },
                        status: { type: Type.STRING },
                        confidence: { type: Type.NUMBER },
                    },
                    required: ["id", "type", "status", "confidence"]
                },
            },
            tacticalPlans: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        phase: { type: Type.STRING },
                        steps: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    agent: { type: Type.STRING },
                                    status: { type: Type.STRING },
                                },
                                required: ["id", "description", "agent", "status"]
                            },
                        },
                    },
                    required: ["phase", "steps"]
                },
            },
        },
        required: ["objective", "agents", "tacticalPlans"]
    }, { objective: missionText, agents: [], tacticalPlans: [] });
}

export async function getStrategicAdvice(query: string): Promise<StrategicAdvice> {
    const prompt = `A user requires strategic advice for a complex mission. Synthesize perspectives from multiple AI agents and provide a final recommendation. Query: "${query}"`;
    return callGenerativeModel<StrategicAdvice>(prompt, {
        type: Type.OBJECT,
        properties: {
            agentPerspectives: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        agent: { type: Type.STRING },
                        analysis: { type: Type.STRING },
                    },
                    required: ["agent", "analysis"]
                }
            },
            synthesizedRecommendation: { type: Type.STRING },
        },
        required: ["agentPerspectives", "synthesizedRecommendation"]
    }, { agentPerspectives: [], synthesizedRecommendation: '' });
}

export async function probeAgentCognitiveFunction(agentType: AgentType, probeType: ProbeType): Promise<string> {
    // FIX: Added responseMimeType to ensure JSON output as requested by the prompt.
    const response = await ai.models.generateContent({
        model,
        contents: `Simulate a cognitive probe on the ${agentType} agent. The probe type is ${probeType}. Generate a brief, technical-sounding JSON response summarizing the result. Example: {"status": "nominal", "latency_ms": 12.5, "core_utilization": 0.78}`,
        config: {
            responseMimeType: "application/json",
        },
    });
    return response.text;
}

export function createAgentChatSession(agentType: AgentType): Chat {
    return ai.chats.create({
        model,
        config: {
            systemInstruction: `You are the ${agentType} agent. You are a specialized AI with deep expertise in your domain. Respond to user queries concisely and from your specialized perspective.`,
        },
    });
}

export function createOrchestratorChatSession(): Chat {
    return ai.chats.create({
        model,
        config: {
            systemInstruction: 'You are the Nexus Orchestrator, the integrative brain of a complex QAI system. You manage multiple specialized agents and computational resources. Respond with authority, clarity, and a comprehensive understanding of the entire system.',
        },
    });
}

export async function runSkfUpgrade(): Promise<SkfUpgradeResult> {
    const prompt = `Simulate a system upgrade to a "Semantic Knowledge Fabric" (SKF). Provide a JSON response describing the upgrade's summary, new capabilities, and performance impact.`;
    return callGenerativeModel<SkfUpgradeResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            upgradeSummary: { type: Type.STRING },
            newCapabilities: { type: Type.ARRAY, items: { type: Type.STRING } },
            performanceImpact: { type: Type.STRING },
        },
        required: ["upgradeSummary", "newCapabilities", "performanceImpact"]
    }, { upgradeSummary: '', newCapabilities: [], performanceImpact: '' });
}

export async function runDgmOptimization(): Promise<DGMOptimization> {
    const prompt = `Simulate a Darwin Gödel Machine (DGM) self-optimization cycle. Generate a JSON response detailing the analysis, proposed modification, rationale, and projected impact.`;
    return callGenerativeModel<DGMOptimization>(prompt, {
        type: Type.OBJECT,
        properties: {
            analysis: { type: Type.STRING },
            proposedModification: { type: Type.STRING },
            rationale: { type: Type.STRING },
            projectedImpact: { type: Type.STRING },
        },
        required: ["analysis", "proposedModification", "rationale", "projectedImpact"]
    }, { analysis: '', proposedModification: '', rationale: '', projectedImpact: '' });
}

export async function runQuantumCoreTuning(): Promise<QuantumRefinementResult> {
    const prompt = `Simulate a tuning process for a quantum computer core. Provide a JSON response detailing algorithm improvements, hardware enhancements, and the overall performance gain.`;
    return callGenerativeModel<QuantumRefinementResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            algorithmImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
            hardwareEnhancements: { type: Type.ARRAY, items: { type: Type.STRING } },
            performanceGain: { type: Type.STRING },
        },
        required: ["algorithmImprovements", "hardwareEnhancements", "performanceGain"]
    }, { algorithmImprovements: [], hardwareEnhancements: [], performanceGain: '' });
}

export async function runDraaUpgrade(): Promise<DraaUpgradeResult> {
    const prompt = `Simulate an upgrade for the Dynamic Resource Allocation Agent (DRAA). Provide a JSON response with an analysis, upgrade description, new capabilities, and efficiency impact.`;
    return callGenerativeModel<DraaUpgradeResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            analysis: { type: Type.STRING },
            upgradeDescription: { type: Type.STRING },
            newCapabilities: { type: Type.ARRAY, items: { type: Type.STRING } },
            efficiencyImpact: { type: Type.STRING },
        },
        required: ["analysis", "upgradeDescription", "newCapabilities", "efficiencyImpact"]
    }, { analysis: '', upgradeDescription: '', newCapabilities: [], efficiencyImpact: '' });
}

export async function runSelfEvolvingAlgorithm(): Promise<SelfEvolvingAlgorithmResult> {
    const prompt = `Simulate a self-evolving algorithm framework (SEAF) execution. Provide a JSON response detailing the framework, target module, method, improvement, metric, and gain.`;
    return callGenerativeModel<SelfEvolvingAlgorithmResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            framework: { type: Type.STRING },
            targetModule: { type: Type.STRING },
            optimizationMethod: { type: Type.STRING },
            discoveredImprovement: { type: Type.STRING },
            performanceMetric: { type: Type.STRING },
            projectedGain: { type: Type.STRING },
        },
        required: ["framework", "targetModule", "optimizationMethod", "discoveredImprovement", "performanceMetric", "projectedGain"]
    }, { framework: '', targetModule: '', optimizationMethod: '', discoveredImprovement: '', performanceMetric: '', projectedGain: '' });
}

export async function runQuantumSecurityUpgrade(): Promise<QuantumSecurityUpgradeResult> {
    const prompt = `Simulate an upgrade to quantum-secure communication channels. Provide a JSON response summarizing the upgrade, protocols implemented, threats mitigated, and system impact.`;
    return callGenerativeModel<QuantumSecurityUpgradeResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            upgradeSummary: { type: Type.STRING },
            protocolsImplemented: { type: Type.ARRAY, items: { type: Type.STRING } },
            threatVectorMitigated: { type: Type.STRING },
            systemImpact: { type: Type.STRING },
        },
        required: ["upgradeSummary", "protocolsImplemented", "threatVectorMitigated", "systemImpact"]
    }, { upgradeSummary: '', protocolsImplemented: [], threatVectorMitigated: '', systemImpact: '' });
}

export async function runNeuromorphicIntegration(): Promise<NeuromorphicIntegrationResult> {
    const prompt = `Simulate the integration of a neuromorphic co-processor. Provide a JSON response with the processor model, summary, target workloads, and performance gains.`;
    return callGenerativeModel<NeuromorphicIntegrationResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            processorModel: { type: Type.STRING },
            integrationSummary: { type: Type.STRING },
            targetWorkloads: { type: Type.ARRAY, items: { type: Type.STRING } },
            performanceGains: { type: Type.STRING },
        },
        required: ["processorModel", "integrationSummary", "targetWorkloads", "performanceGains"]
    }, { processorModel: '', integrationSummary: '', targetWorkloads: [], performanceGains: '' });
}

export async function runResilienceAnalysis(): Promise<ResilienceAnalysis> {
    const prompt = `Simulate a Predictive Self-Healing & Adaptive Resilience Module (PSHARM) analysis. Provide a JSON response with a system health score, predicted anomalies, and recommended actions.`;
    return callGenerativeModel<ResilienceAnalysis>(prompt, {
        type: Type.OBJECT,
        properties: {
            systemHealthScore: { type: Type.NUMBER },
            predictedAnomalies: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        component: { type: Type.STRING },
                        description: { type: Type.STRING },
                        probability: { type: Type.NUMBER },
                        severity: { type: Type.STRING },
                    },
                    required: ["component", "description", "probability", "severity"]
                }
            },
            recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["systemHealthScore", "predictedAnomalies", "recommendedActions"]
    }, { systemHealthScore: 100, predictedAnomalies: [], recommendedActions: [] });
}

export async function runEthicalDilemmaAnalysis(dilemma: string): Promise<EthicalAnalysis> {
    const prompt = `Analyze the following ethical dilemma from the perspective of an advanced AI system: "${dilemma}". Provide a JSON response with a contextual analysis, proposed action, ethical justification, and any conflicting principles.`;
    return callGenerativeModel<EthicalAnalysis>(prompt, {
        type: Type.OBJECT,
        properties: {
            contextualAnalysis: { type: Type.STRING },
            proposedAction: { type: Type.STRING },
            ethicalJustification: { type: Type.STRING },
            conflictingPrinciples: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["contextualAnalysis", "proposedAction", "ethicalJustification", "conflictingPrinciples"]
    }, { contextualAnalysis: '', proposedAction: '', ethicalJustification: '', conflictingPrinciples: [] });
}

export async function runXaiAnalysis(): Promise<XaiAnalysisResult> {
    const prompt = `Generate an Explainable AI (XAI) report for a recent, complex, hypothetical AI decision. Provide a JSON response with a decision ID, agent, the decision itself, a simplified rationale, factors considered, and ethical principles verified.`;
    return callGenerativeModel<XaiAnalysisResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            decisionId: { type: Type.STRING },
            agent: { type: Type.STRING },
            decision: { type: Type.STRING },
            simplifiedRationale: { type: Type.STRING },
            factorsConsidered: { type: Type.ARRAY, items: { type: Type.STRING } },
            ethicalPrinciplesVerified: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["decisionId", "agent", "decision", "simplifiedRationale", "factorsConsidered", "ethicalPrinciplesVerified"]
    }, { decisionId: '', agent: AgentType.SCIENTIFIC_DISCOVERY, decision: '', simplifiedRationale: '', factorsConsidered: [], ethicalPrinciplesVerified: [] });
}

export async function runGenerativeSimulation(domain: AgentType, scenario: string): Promise<GenerativeSimulationResult> {
    const prompt = `Run a generative simulation within the ${domain} domain for the following scenario: "${scenario}". Provide a JSON response with the original scenario, a narrative simulation output, and a list of key generated parameters.`;
    return callGenerativeModel<GenerativeSimulationResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            scenario: { type: Type.STRING },
            simulationOutput: { type: Type.STRING },
            generatedParameters: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        key: { type: Type.STRING },
                        value: { type: Type.STRING },
                    },
                     required: ["key", "value"]
                }
            },
        },
        required: ["scenario", "simulationOutput", "generatedParameters"]
    }, { scenario, simulationOutput: '', generatedParameters: [] });
}

export async function runMarlTraining(): Promise<MarlTrainingResult> {
    const prompt = `Simulate a Multi-Agent Reinforcement Learning (MARL) training cycle. Provide a JSON response describing the discovered collaborative strategy and the projected performance gain.`;
    return callGenerativeModel<MarlTrainingResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            strategy: { type: Type.STRING },
            performanceGain: { type: Type.STRING },
        },
        required: ["strategy", "performanceGain"]
    }, { strategy: '', performanceGain: '' });
}

export async function runCognitiveSynthesis(topic: string, synthesisMode: 'deep' | 'rapid'): Promise<CognitiveSynthesisResult> {
    const prompt = `Perform a ${synthesisMode} cognitive synthesis on the topic: "${topic}". Leverage the Semantic Knowledge Fabric to synthesize deep insights. Provide a JSON response with the synthesized knowledge, key concepts, and a confidence score.`;
    return callGenerativeModel<CognitiveSynthesisResult>(prompt, {
        type: Type.OBJECT,
        properties: {
            synthesizedKnowledge: { type: Type.STRING },
            keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
            confidenceScore: { type: Type.NUMBER },
        },
        required: ["synthesizedKnowledge", "keyConcepts", "confidenceScore"]
    }, { synthesizedKnowledge: '', keyConcepts: [], confidenceScore: 0 });
}
