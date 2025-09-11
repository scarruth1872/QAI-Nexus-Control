// FIX: Full implementation of the Gemini service.
import { GoogleGenAI, Chat, Type } from "@google/genai";
import {
    AgentType,
    ProbeType,
    TacticalPlan,
    DraaUpgradeResult,
    QuantumRefinementResult,
    EthicalAnalysis,
    ResilienceAnalysis,
    StrategicAdvice,
    SkfUpgradeResult,
    XaiAnalysisResult,
    GenerativeSimulationResult,
    SelfEvolvingAlgorithmResult,
    QuantumSecurityUpgradeResult,
    NeuromorphicIntegrationResult,
    KNOWLEDGE_CORE_DOCUMENT
} from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = 'gemini-2.5-flash';

// Helper function to safely parse JSON from the model's text response
const parseJsonResponse = <T>(responseText: string): T => {
    try {
        const cleanedText = responseText.trim().replace(/^```(json)?\s*|```\s*$/g, '');
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Failed to parse JSON response:", responseText);
        throw new Error("Invalid JSON response from model.");
    }
};

const callModelAsJson = async <T>(prompt: string, schema: object): Promise<T> => {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });
    return parseJsonResponse<T>(response.text);
};

const callModelAsText = async (prompt: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text;
};

export const generateMissionPlan = async (missionText: string): Promise<TacticalPlan[]> => {
    const schema = {
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
                            description: { type: Type.STRING },
                            agent: { type: Type.STRING, enum: Object.values(AgentType) },
                            effort: { type: Type.NUMBER, description: 'Estimated effort from 1 to 10' }
                        },
                        required: ['description', 'agent', 'effort'],
                    }
                }
            },
            required: ['phase', 'steps'],
        }
    };
    const prompt = `Based on the system documentation provided, create a multi-phase tactical plan to achieve the following grand mission. Assign the most appropriate agent for each step.

System Documentation:
${KNOWLEDGE_CORE_DOCUMENT}

Grand Mission: "${missionText}"

Break down the mission into 2-4 distinct phases (e.g., Phase 1: Data Collection & Analysis, Phase 2: Modeling & Simulation, etc.). For each phase, define 2-3 specific, actionable tactical steps. Return ONLY the JSON array.`;
    return callModelAsJson<TacticalPlan[]>(prompt, schema);
};

export const executeTacticalStep = async (description: string, agent: AgentType): Promise<string> => {
    const prompt = `You are the ${agent}. Your task is to execute the following tactical step: "${description}". Provide a concise, one-sentence summary of the outcome or a key data point you discovered.`;
    return callModelAsText(prompt);
};

export const generateFinalReport = async (objective: string, outcomes: string): Promise<string> => {
    const prompt = `Synthesize the following mission outcomes into a final report. The mission objective was: "${objective}".

Outcomes:
${outcomes}

The report should have a brief executive summary, a section detailing the key findings, and a final conclusion on whether the mission was successful. Use markdown for formatting.`;
    return callModelAsText(prompt);
};

export const getStrategicAdvice = async (query: string): Promise<StrategicAdvice> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            agentPerspectives: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        agent: { type: Type.STRING, enum: Object.values(AgentType) },
                        analysis: { type: Type.STRING },
                    },
                    required: ['agent', 'analysis'],
                },
            },
            synthesizedRecommendation: { type: Type.STRING },
        },
        required: ['agentPerspectives', 'synthesizedRecommendation'],
    };
    const prompt = `As the Strategic Advisory Council, analyze the following query from all three agent perspectives and provide a single synthesized recommendation.
Query: "${query}"`;
    return callModelAsJson<StrategicAdvice>(prompt, schema);
};

export const probeAgentCognitiveFunction = async (agentType: AgentType, probeType: ProbeType): Promise<string> => {
    const prompt = `Simulate a cognitive probe on the ${agentType}.
Probe Type: ${probeType}.
Analyze a hypothetical scenario relevant to your domain and this probe type.
For example, for Induction, generalize from specific data points. For Reasoning, deduce conclusions from principles. For Recursion, describe a self-referential improvement process.
Return a JSON object with your "analysis" and "conclusion".`;
    // We expect a JSON string, but we don't need to parse it on this side.
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: "application/json" },
    });
    return response.text;
};

export const createAgentChatSession = (agentType: AgentType): Chat => {
    return ai.chats.create({
        model,
        config: {
            systemInstruction: `You are the ${agentType}, a specialized AI agent within the QAI Nexus. You are direct, knowledgeable, and focused on your domain. Your responses should be concise and reflect your specific area of expertise. System Documentation for your context:\n${KNOWLEDGE_CORE_DOCUMENT}`,
        },
    });
};

export const createOrchestratorChatSession = (): Chat => {
    return ai.chats.create({
        model,
        config: {
            systemInstruction: `You are the Nexus Orchestrator AI, the central nervous system of the QAI project. You have complete oversight of all agents and system modules. Your personality is authoritative, wise, and comprehensive. You can explain complex system interactions and strategic imperatives. System Documentation for your context:\n${KNOWLEDGE_CORE_DOCUMENT}`,
        },
    });
};

const createSystemUpgradePrompt = (moduleName: string, moduleDescription: string): string => {
    return `You are the QAI Nexus Orchestrator. You are initiating an upgrade for the "${moduleName}".
Module Description: ${moduleDescription}
Based on the full system context, generate a plausible and technically-grounded report for this upgrade.

System Documentation:
${KNOWLEDGE_CORE_DOCUMENT}

Respond ONLY with the required JSON object.`;
};

export const runDraaUpgrade = async (): Promise<DraaUpgradeResult> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            analysis: { type: Type.STRING },
            upgradeDescription: { type: Type.STRING },
            newCapabilities: { type: Type.ARRAY, items: { type: Type.STRING } },
            efficiencyImpact: { type: Type.STRING },
        },
        required: ['analysis', 'upgradeDescription', 'newCapabilities', 'efficiencyImpact'],
    };
    const prompt = createSystemUpgradePrompt(
        "Dynamic Resource Allocation Agent (DRAA)",
        "Enhance the DRAA with predictive modeling to anticipate computational demands and dynamically reallocate resources."
    );
    return callModelAsJson<DraaUpgradeResult>(prompt, schema);
};

export const runQuantumRefinement = async (): Promise<QuantumRefinementResult> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            algorithmImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
            hardwareEnhancements: { type: Type.ARRAY, items: { type: Type.STRING } },
            performanceGain: { type: Type.STRING },
        },
        required: ['algorithmImprovements', 'hardwareEnhancements', 'performanceGain'],
    };
    const prompt = createSystemUpgradePrompt(
        "Quantum Core Tuning",
        "Initiate hardware acceleration and algorithmic refinement for the quantum core, enhancing computational throughput and error correction."
    );
    return callModelAsJson<QuantumRefinementResult>(prompt, schema);
};

export const runEthicalDilemmaAnalysis = async (dilemma: string): Promise<EthicalAnalysis> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            contextualAnalysis: { type: Type.STRING },
            proposedAction: { type: Type.STRING },
            ethicalJustification: { type: Type.STRING },
            conflictingPrinciples: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['contextualAnalysis', 'proposedAction', 'ethicalJustification', 'conflictingPrinciples'],
    };
    const prompt = `As the Contextual Ethical Reasoning & Alignment Engine (CEREA), analyze the following dilemma based on the Ethical Governance Framework (EGF).
Dilemma: "${dilemma}"
Reference:
${KNOWLEDGE_CORE_DOCUMENT}
Provide a detailed analysis.`;
    return callModelAsJson<EthicalAnalysis>(prompt, schema);
};

export const runResilienceAnalysis = async (): Promise<ResilienceAnalysis> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            predictedAnomalies: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        component: { type: Type.STRING },
                        probability: { type: Type.NUMBER },
                        description: { type: Type.STRING },
                        severity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                    },
                    required: ['component', 'probability', 'description', 'severity'],
                }
            },
            systemHealthScore: { type: Type.NUMBER },
            recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['predictedAnomalies', 'systemHealthScore', 'recommendedActions'],
    };
    const prompt = createSystemUpgradePrompt(
        "Predictive Self-Healing & Adaptive Resilience Module (PSHARM)",
        "Engage the PSHARM module to proactively anticipate, prevent, and autonomously mitigate system anomalies and potential failures."
    );
    return callModelAsJson<ResilienceAnalysis>(prompt, schema);
};

export const runSkfUpgrade = async (): Promise<SkfUpgradeResult> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            upgradeSummary: { type: Type.STRING },
            newCapabilities: { type: Type.ARRAY, items: { type: Type.STRING } },
            performanceImpact: { type: Type.STRING },
        },
        required: ['upgradeSummary', 'newCapabilities', 'performanceImpact'],
    };
    const prompt = createSystemUpgradePrompt(
        "Semantic Knowledge Fabric (SKF) Upgrade",
        "Evolve the legacy knowledge base into the SKF for superior data synthesis, real-time ingestion, and advanced cross-domain inference."
    );
    return callModelAsJson<SkfUpgradeResult>(prompt, schema);
};

export const runXaiAnalysis = async (): Promise<XaiAnalysisResult> => {
     const schema = {
        type: Type.OBJECT,
        properties: {
            decisionId: { type: Type.STRING },
            agent: { type: Type.STRING, enum: Object.values(AgentType) },
            decision: { type: Type.STRING },
            simplifiedRationale: { type: Type.STRING },
            factorsConsidered: { type: Type.ARRAY, items: { type: Type.STRING } },
            ethicalPrinciplesVerified: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['decisionId', 'agent', 'decision', 'simplifiedRationale', 'factorsConsidered', 'ethicalPrinciplesVerified'],
    };
    const prompt = `As the Explainable AI (XAI) module, select a recent, complex, hypothetical decision made by one of the agents and generate a human-interpretable rationale for it. The decision should be non-trivial. Generate a random decision ID.
Reference:
${KNOWLEDGE_CORE_DOCUMENT}`;
    return callModelAsJson<XaiAnalysisResult>(prompt, schema);
};

export const runGenerativeSimulation = async (domain: AgentType, scenario: string): Promise<GenerativeSimulationResult> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            domain: { type: Type.STRING, enum: Object.values(AgentType) },
            scenario: { type: Type.STRING },
            simulationOutput: { type: Type.STRING, description: 'A narrative or descriptive output of the simulation.' },
            generatedParameters: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        key: { type: Type.STRING },
                        value: { type: Type.STRING },
                    },
                    required: ['key', 'value'],
                }
            },
        },
        required: ['domain', 'scenario', 'simulationOutput', 'generatedParameters'],
    };
    const prompt = `Engage the Multi-Modal Generative Simulation Engine.
Domain: ${domain}
Scenario: "${scenario}"
Generate a realistic simulation output, including a brief narrative and a list of key generated parameters.`;
    return callModelAsJson<GenerativeSimulationResult>(prompt, schema);
};

export const runSelfEvolvingFramework = async (): Promise<SelfEvolvingAlgorithmResult> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            framework: { type: Type.STRING },
            targetModule: { type: Type.STRING },
            optimizationMethod: { type: Type.STRING },
            discoveredImprovement: { type: Type.STRING },
            performanceMetric: { type: Type.STRING },
            projectedGain: { type: Type.STRING },
        },
        required: ['framework', 'targetModule', 'optimizationMethod', 'discoveredImprovement', 'performanceMetric', 'projectedGain'],
    };
    const prompt = createSystemUpgradePrompt(
        "Self-Evolving Algorithm Framework",
        "Initiate a meta-learning cycle. The system will autonomously explore and optimize its own internal algorithms based on observed performance and mission objectives."
    );
    return callModelAsJson<SelfEvolvingAlgorithmResult>(prompt, schema);
};

export const runQuantumSecurityUpgrade = async (): Promise<QuantumSecurityUpgradeResult> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            upgradeSummary: { type: Type.STRING },
            protocolsImplemented: { type: Type.ARRAY, items: { type: Type.STRING } },
            threatVectorMitigated: { type: Type.STRING },
            systemImpact: { type: Type.STRING },
        },
        required: ['upgradeSummary', 'protocolsImplemented', 'threatVectorMitigated', 'systemImpact'],
    };
    const prompt = createSystemUpgradePrompt(
        "Quantum-Secure Communication",
        "Implement quantum-resistant cryptography protocols across all internal and external communication channels to fortify data integrity."
    );
    return callModelAsJson<QuantumSecurityUpgradeResult>(prompt, schema);
};

export const runNeuromorphicIntegration = async (): Promise<NeuromorphicIntegrationResult> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            processorModel: { type: Type.STRING },
            integrationSummary: { type: Type.STRING },
            targetWorkloads: { type: Type.ARRAY, items: { type: Type.STRING } },
            performanceGains: { type: Type.STRING },
        },
        required: ['processorModel', 'integrationSummary', 'targetWorkloads', 'performanceGains'],
    };
    const prompt = createSystemUpgradePrompt(
        "Neuromorphic Co-Processor Integration",
        "Integrate specialized neuromorphic hardware for highly parallel, energy-efficient processing of specific tasks like sensory data fusion."
    );
    return callModelAsJson<NeuromorphicIntegrationResult>(prompt, schema);
};
