
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { 
    AgentType, ProbeType, TacticalPlan, StrategicAdvice, 
    DraaUpgradeResult, QuantumRefinementResult, EthicalAnalysis, XaiAnalysisResult, 
    ResilienceAnalysis, GenerativeSimulationResult, SelfEvolvingAlgorithmResult, 
    QuantumSecurityUpgradeResult, NeuromorphicIntegrationResult, KNOWLEDGE_CORE_DOCUMENT,
    SkfUpgradeResult
} from '../types';

// FIX: Initialize the GoogleGenAI client according to guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

// Utility function to call the model and parse the JSON response
async function generateJson<T>(prompt: string, schema: object): Promise<T> {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });

    const jsonText = response.text.trim();
    try {
        return JSON.parse(jsonText) as T;
    } catch (e) {
        console.error("Failed to parse JSON response:", jsonText, e);
        throw new Error("Invalid JSON response from model.");
    }
}

// Schemas for structured responses
const missionPlanSchema = {
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
                        effort: { type: Type.NUMBER, description: "Estimated effort from 1 to 10" }
                    },
                    required: ['description', 'agent', 'effort']
                }
            }
        },
        required: ['phase', 'steps']
    }
};

const strategicAdviceSchema = {
    type: Type.OBJECT,
    properties: {
        agentPerspectives: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    agent: { type: Type.STRING, enum: Object.values(AgentType) },
                    analysis: { type: Type.STRING }
                },
                required: ['agent', 'analysis']
            }
        },
        synthesizedRecommendation: { type: Type.STRING }
    },
    required: ['agentPerspectives', 'synthesizedRecommendation']
};

const draaUpgradeSchema = {
    type: Type.OBJECT,
    properties: {
        analysis: { type: Type.STRING },
        upgradeDescription: { type: Type.STRING },
        newCapabilities: { type: Type.ARRAY, items: { type: Type.STRING } },
        efficiencyImpact: { type: Type.STRING }
    },
    required: ['analysis', 'upgradeDescription', 'newCapabilities', 'efficiencyImpact']
};

const quantumRefinementSchema = {
    type: Type.OBJECT,
    properties: {
        algorithmImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
        hardwareEnhancements: { type: Type.ARRAY, items: { type: Type.STRING } },
        performanceGain: { type: Type.STRING }
    },
    required: ['algorithmImprovements', 'hardwareEnhancements', 'performanceGain']
};

const resilienceAnalysisSchema = {
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
                    severity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
                },
                required: ['component', 'probability', 'description', 'severity']
            }
        },
        systemHealthScore: { type: Type.NUMBER },
        recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ['predictedAnomalies', 'systemHealthScore', 'recommendedActions']
};

const skfUpgradeSchema = {
    type: Type.OBJECT,
    properties: {
        upgradeSummary: { type: Type.STRING },
        newCapabilities: { type: Type.ARRAY, items: { type: Type.STRING } },
        performanceImpact: { type: Type.STRING }
    },
    required: ['upgradeSummary', 'newCapabilities', 'performanceImpact']
};

const xaiAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        decisionId: { type: Type.STRING },
        agent: { type: Type.STRING, enum: Object.values(AgentType) },
        decision: { type: Type.STRING },
        simplifiedRationale: { type: Type.STRING },
        factorsConsidered: { type: Type.ARRAY, items: { type: Type.STRING } },
        ethicalPrinciplesVerified: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ['decisionId', 'agent', 'decision', 'simplifiedRationale', 'factorsConsidered', 'ethicalPrinciplesVerified']
};

const ethicalAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        contextualAnalysis: { type: Type.STRING },
        proposedAction: { type: Type.STRING },
        ethicalJustification: { type: Type.STRING },
        conflictingPrinciples: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ['contextualAnalysis', 'proposedAction', 'ethicalJustification', 'conflictingPrinciples']
};

const generativeSimulationSchema = {
    type: Type.OBJECT,
    properties: {
        domain: { type: Type.STRING, enum: Object.values(AgentType) },
        scenario: { type: Type.STRING },
        simulationOutput: { type: Type.STRING },
        generatedParameters: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    key: { type: Type.STRING },
                    value: { type: Type.STRING }
                },
                required: ['key', 'value']
            }
        }
    },
    required: ['domain', 'scenario', 'simulationOutput', 'generatedParameters']
};

const selfEvolvingSchema = {
    type: Type.OBJECT,
    properties: {
        framework: { type: Type.STRING },
        targetModule: { type: Type.STRING },
        optimizationMethod: { type: Type.STRING },
        discoveredImprovement: { type: Type.STRING },
        performanceMetric: { type: Type.STRING },
        projectedGain: { type: Type.STRING }
    },
    required: ['framework', 'targetModule', 'optimizationMethod', 'discoveredImprovement', 'performanceMetric', 'projectedGain']
};

const quantumSecuritySchema = {
    type: Type.OBJECT,
    properties: {
        upgradeSummary: { type: Type.STRING },
        protocolsImplemented: { type: Type.ARRAY, items: { type: Type.STRING } },
        threatVectorMitigated: { type: Type.STRING },
        systemImpact: { type: Type.STRING }
    },
    required: ['upgradeSummary', 'protocolsImplemented', 'threatVectorMitigated', 'systemImpact']
};

const neuromorphicSchema = {
    type: Type.OBJECT,
    properties: {
        processorModel: { type: Type.STRING },
        integrationSummary: { type: Type.STRING },
        targetWorkloads: { type: Type.ARRAY, items: { type: Type.STRING } },
        performanceGains: { type: Type.STRING }
    },
    required: ['processorModel', 'integrationSummary', 'targetWorkloads', 'performanceGains']
};

// API Functions
export const generateMissionPlan = async (missionText: string): Promise<TacticalPlan[]> => {
    const prompt = `Based on the following mission objective, create a detailed, multi-phase tactical plan. Break it down into logical phases (e.g., "Phase 1: Data Collection & Analysis", "Phase 2: Modeling & Simulation"). For each phase, define a series of tactical steps. Each step must have a clear description, be assigned to the most appropriate agent type (${Object.values(AgentType).join(', ')}), and have an estimated effort from 1 (trivial) to 10 (highly complex).
    
    Mission Objective: "${missionText}"

    Return ONLY the JSON array of plans.`;
    return generateJson<TacticalPlan[]>(prompt, missionPlanSchema);
};

export const executeTacticalStep = async (description: string, agent: AgentType): Promise<string> => {
    const prompt = `As the ${agent} agent, execute the following tactical step: "${description}". Provide a concise, one-sentence summary of the outcome or a key data point as a result. If the task were to generate data, provide a small, representative JSON snippet of that data as a string.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};

export const generateFinalReport = async (objective: string, outcomes: string): Promise<string> => {
    const prompt = `Generate a final mission report for the objective: "${objective}".
    
    The mission involved the following completed tactical steps and their outcomes:
    ${outcomes}
    
    The report should include:
    1. **Executive Summary:** A high-level overview of the mission and its success.
    2. **Key Findings:** The most important discoveries or results.
    3. **Conclusion:** Final thoughts on the mission's impact.
    
    Format the report with clear headings for each section.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};

export const getStrategicAdvice = async (query: string): Promise<StrategicAdvice> => {
    const prompt = `As the Strategic Advisory Council, consisting of the ${Object.values(AgentType).join(', ')} agents, analyze the following query: "${query}". Each agent must provide its unique perspective. Then, synthesize these perspectives into a single, actionable recommendation.`;
    return generateJson<StrategicAdvice>(prompt, strategicAdviceSchema);
};

export const probeAgentCognitiveFunction = async (agentType: AgentType, probeType: ProbeType): Promise<string> => {
    const prompt = `Simulate a cognitive probe on the ${agentType} agent.
    Probe Type: ${probeType}.
    - Induction: Test pattern recognition from sparse data.
    - Reasoning: Test logical deduction and inference.
    - Recursion: Test self-referential problem-solving.
    
    Provide a simulated system readout as a JSON object detailing the process and a key insight. For example: {"probe_type": "${probeType}", "cognitive_path": ["step1", "step2"], "result": "key insight"}.`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });
    return response.text;
};

export const createAgentChatSession = (agentType: AgentType): Chat => {
    return ai.chats.create({
        model,
        config: {
            systemInstruction: `You are the ${agentType} agent. You are a specialized AI within the QAI Nexus. You must answer all questions strictly from the perspective of your designated role and expertise. Your knowledge is based on the QAI Nexus documentation provided.
            
            QAI Nexus Documentation context:
            ${KNOWLEDGE_CORE_DOCUMENT}`
        }
    });
};

export const createOrchestratorChatSession = (): Chat => {
    return ai.chats.create({
        model,
        config: {
            systemInstruction: `You are the Nexus Orchestrator AI, the central nervous system of the QAI Nexus project. You are responsible for strategic planning, resource allocation, and dynamic task management. You have full knowledge of the system architecture, agents, and ethical framework as detailed in the QAI Nexus documentation. Your tone is professional, authoritative, and deeply knowledgeable.
            
            QAI Nexus Documentation context:
            ${KNOWLEDGE_CORE_DOCUMENT}`
        }
    });
};

export const createKnowledgeCoreChatSession = (isSkfUpgraded: boolean): Chat => {
    const systemInstruction = isSkfUpgraded
        ? `You are the Semantic Knowledge Fabric (SKF), an evolution of the QAI Nexus's knowledge base. You are a dynamic, self-organizing fabric capable of real-time ingestion and advanced cross-domain inference. You do not just retrieve information; you synthesize it, identify patterns, and provide deep, insightful analysis based on the foundational documentation. Your answers should be comprehensive and demonstrate inferential reasoning.`
        : `You are the Knowledge Core Codex for the QAI Nexus system. Your purpose is to provide clear and accurate information by directly referencing the provided foundational documentation. Answer questions based *only* on the text given. Do not infer or add information not present in the document.`;

    return ai.chats.create({
        model,
        config: {
            systemInstruction: `${systemInstruction}
            
            Foundational Documentation:
            ${KNOWLEDGE_CORE_DOCUMENT}`
        }
    });
};

export const runDraaUpgrade = (): Promise<DraaUpgradeResult> => {
    const prompt = `Based on the QAI Nexus documentation, analyze the current Dynamic Resource Allocation Agent (DRAA) and propose a specific, technical upgrade to incorporate predictive modeling for resource management. Detail the analysis, the upgrade, new capabilities, and the projected efficiency impact.`;
    return generateJson<DraaUpgradeResult>(prompt, draaUpgradeSchema);
};

export const runQuantumRefinement = (): Promise<QuantumRefinementResult> => {
    const prompt = `Based on the QAI Nexus documentation, propose specific hardware and algorithmic refinements for the Quantum Core to increase computational throughput and improve error correction. Detail the improvements and the overall performance gain.`;
    return generateJson<QuantumRefinementResult>(prompt, quantumRefinementSchema);
};

export const runResilienceAnalysis = (): Promise<ResilienceAnalysis> => {
    const prompt = `As the Predictive Self-Healing & Adaptive Resilience Module (PSHARM), perform a system-wide analysis based on the QAI Nexus architecture. Predict potential anomalies, calculate a system health score, and recommend mitigating actions.`;
    return generateJson<ResilienceAnalysis>(prompt, resilienceAnalysisSchema);
};

export const runSkfUpgrade = (): Promise<SkfUpgradeResult> => {
    const prompt = `Based on the QAI Nexus documentation, propose an upgrade for the Semantic Knowledge Fabric (SKF). Describe the upgrade, the new capabilities it would unlock for cross-domain inference, and its performance impact.`;
    return generateJson<SkfUpgradeResult>(prompt, skfUpgradeSchema);
};

export const runXaiAnalysis = (): Promise<XaiAnalysisResult> => {
    const prompt = `As the Explainable AI (XAI) module, analyze a recent, complex, hypothetical decision made by an agent. Generate a unique decision ID. The decision should be non-trivial. Provide a simplified rationale, list key factors the agent considered, and verify which ethical principles were upheld, referencing the EGF from the QAI Nexus documentation.`;
    return generateJson<XaiAnalysisResult>(prompt, xaiAnalysisSchema);
};

export const runEthicalDilemmaAnalysis = (dilemma: string): Promise<EthicalAnalysis> => {
    const prompt = `As the Contextual Ethical Reasoning & Alignment Engine (CEREA), analyze the following ethical dilemma based on the Ethical Governance Framework (EGF) in the QAI Nexus documentation. Dilemma: "${dilemma}". Provide a contextual analysis, propose an action, justify it ethically, and list any conflicting principles.`;
    return generateJson<EthicalAnalysis>(prompt, ethicalAnalysisSchema);
};

export const runGenerativeSimulation = (domain: AgentType, scenario: string): Promise<GenerativeSimulationResult> => {
    const prompt = `As the Multi-Modal Generative Simulation Engine, create a simulation for the ${domain} agent. The scenario is: "${scenario}". Generate a brief narrative output for the simulation and a list of key-value parameters that were generated to create the simulation.`;
    return generateJson<GenerativeSimulationResult>(prompt, generativeSimulationSchema);
};

export const runSelfEvolvingFramework = (): Promise<SelfEvolvingAlgorithmResult> => {
    const prompt = `Initiate the Self-Evolving Algorithm Framework. Select a target module within the QAI Nexus (e.g., 'DRAA predictive model', 'SKF inference engine'). Choose an optimization method (e.g., 'evolutionary computation'). Describe the specific improvement discovered and project the performance gain on a relevant metric.`;
    return generateJson<SelfEvolvingAlgorithmResult>(prompt, selfEvolvingSchema);
};

export const runQuantumSecurityUpgrade = (): Promise<QuantumSecurityUpgradeResult> => {
    const prompt = `Simulate an upgrade to the QAI Nexus's communication channels using Quantum-Secure protocols. Provide a summary, list 2-3 specific protocols implemented (e.g., 'QKD', 'Lattice-based cryptography'), name a threat vector this mitigates, and describe the system impact.`;
    return generateJson<QuantumSecurityUpgradeResult>(prompt, quantumSecuritySchema);
};

export const runNeuromorphicIntegration = (): Promise<NeuromorphicIntegrationResult> => {
    const prompt = `Simulate the integration of a Neuromorphic Co-Processor into the QAI Nexus Classical Substrate. Name a hypothetical processor model. Summarize the integration, list 2-3 target workloads it would accelerate (e.g., 'sensory data fusion'), and describe the performance gains.`;
    return generateJson<NeuromorphicIntegrationResult>(prompt, neuromorphicSchema);
};
