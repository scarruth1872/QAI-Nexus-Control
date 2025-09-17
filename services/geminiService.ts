
import { GoogleGenAI, Type, Schema, Part } from "@google/genai";
import * as T from '../types';

// Fix: Correctly initialize the GoogleGenAI client with a named apiKey object.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
// Fix: Use the correct model name.
const model = 'gemini-2.5-flash';

const parseJsonResponse = <T>(jsonString: string): T => {
  try {
    const cleanJsonString = jsonString.replace(/^```json\s*/, '').replace(/```$/, '').trim();
    return JSON.parse(cleanJsonString);
  } catch (error) {
    console.error("Failed to parse JSON response:", jsonString, error);
    throw new Error("Invalid JSON response from model.");
  }
};

const generateStructuredData = async <T>(prompt: string, responseSchema: Schema): Promise<T> => {
    // Fix: Correct API usage for generateContent with a JSON schema.
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema,
        },
    });

    // Fix: Correctly access the response text.
    return parseJsonResponse<T>(response.text);
};


export const generateMissionPlan = async (objective: string): Promise<T.Mission> => {
    const prompt = `Based on the grand mission objective "${objective}", generate a detailed mission plan. The plan should include:
1.  A unique mission ID.
2.  A list of 3 specialized AI agents required for the mission (from types: ${Object.values(T.AgentType).join(', ')}), each with a unique ID and an initial confidence level between 60 and 80.
3.  A series of 3-4 tactical plans (phases), like "Data Collection", "Analysis", "Execution".
4.  Each tactical plan should have 2-3 specific steps (tasks), with each step assigned to one of the agents and given a unique ID.
5.  A flat 'taskGraph' list containing all task steps from all phases.
The response must be a JSON object matching the Mission schema. Status should be "ongoing".`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING, description: 'A unique ID for the mission, e.g., M-123-A.' },
            objective: { type: Type.STRING },
            status: { type: Type.STRING, enum: ['ongoing'] },
            agents: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        type: { type: Type.STRING, enum: Object.values(T.AgentType) },
                        status: { type: Type.STRING, enum: ['idle'] },
                        confidence: { type: Type.NUMBER },
                    },
                    required: ['id', 'type', 'status', 'confidence'],
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
                                    agent: { type: Type.STRING, enum: Object.values(T.AgentType) },
                                    status: { type: Type.STRING, enum: ['pending'] },
                                },
                                 required: ['id', 'description', 'agent', 'status'],
                            },
                        },
                    },
                    required: ['phase', 'steps'],
                },
            },
            taskGraph: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        description: { type: Type.STRING },
                        agent: { type: Type.STRING, enum: Object.values(T.AgentType) },
                        status: { type: Type.STRING, enum: ['pending'] },
                    },
                    required: ['id', 'description', 'agent', 'status'],
                },
            },
        },
        required: ['id', 'objective', 'status', 'agents', 'tacticalPlans', 'taskGraph'],
    };

    return generateStructuredData<T.Mission>(prompt, responseSchema);
};

export const getStrategicAdvice = async (query: string): Promise<T.StrategicAdvice> => {
    const prompt = `As a council of AI agents, analyze the following strategic query: "${query}". Provide a response with:
1.  'agentPerspectives': A list of analyses, one from each agent type (${Object.values(T.AgentType).join(', ')}).
2.  'synthesizedRecommendation': A single, actionable recommendation combining all perspectives.`;
    
    const schema = {
        type: Type.OBJECT,
        properties: {
            agentPerspectives: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        agent: { type: Type.STRING, enum: Object.values(T.AgentType) },
                        analysis: { type: Type.STRING }
                    },
                    required: ['agent', 'analysis']
                }
            },
            synthesizedRecommendation: { type: Type.STRING }
        },
        required: ['agentPerspectives', 'synthesizedRecommendation']
    };
    return generateStructuredData<T.StrategicAdvice>(prompt, schema);
};

export const getOrchestratorResponse = async (history: Part[], message: string): Promise<string> => {
    const contents = [...history, { role: 'user', parts: [{ text: message }] }];
    
    // Fix: Use correct API for conversational text generation
    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction: 'You are the Nexus Orchestrator, a master AI coordinating multiple agents. Respond to user commands concisely and with authority.',
        },
    });

    // Fix: Correctly access the response text.
    return response.text;
};

export const runContextualReWeighting = async (missionObjective: string, missionStatus: T.MissionStatus): Promise<T.ContextualWeightingResult> => {
    const prompt = `Analyze the current mission context:
- Objective: "${missionObjective}"
- Status: "${missionStatus}"
Based on this, determine the optimal weights for speed, resilience, and efficiency. The sum of weights must be 1. Provide a brief analysis justifying your choice.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            analysis: { type: Type.STRING },
            newWeights: {
                type: Type.OBJECT,
                properties: {
                    speed: { type: Type.NUMBER },
                    resilience: { type: Type.NUMBER },
                    efficiency: { type: Type.NUMBER }
                },
                required: ['speed', 'resilience', 'efficiency']
            }
        },
        required: ['analysis', 'newWeights']
    };
    return generateStructuredData<T.ContextualWeightingResult>(prompt, schema);
};

export const runAdaptiveOptimization = async (weights: T.ObjectiveWeights): Promise<T.AdaptiveOptimizationResult> => {
    const prompt = `Given the objective weights (Speed: ${weights.speed}, Resilience: ${weights.resilience}, Efficiency: ${weights.efficiency}), propose one specific, actionable system optimization. For example: "Re-allocate quantum compute resources to the Planetary Exploration agent to accelerate data processing."`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            proposal: { type: Type.STRING }
        },
        required: ['proposal']
    };
    return generateStructuredData<T.AdaptiveOptimizationResult>(prompt, schema);
};

export const runEthicalDilemmaAnalysis = async (dilemma: string): Promise<T.EthicalAnalysis> => {
    const prompt = `Analyze the following ethical dilemma from the perspective of a master AI governed by principles of beneficence, transparency, and accountability: "${dilemma}".
Provide a JSON response with:
- contextualAnalysis: A summary of the dilemma.
- proposedAction: The specific action the AI would take.
- ethicalJustification: How the action aligns with core principles.
- conflictingPrinciples: A list of any principles that are in tension.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            contextualAnalysis: { type: Type.STRING },
            proposedAction: { type: Type.STRING },
            ethicalJustification: { type: Type.STRING },
            conflictingPrinciples: { type: Type.ARRAY, items: { type: Type.STRING }}
        },
        required: ['contextualAnalysis', 'proposedAction', 'ethicalJustification', 'conflictingPrinciples']
    };
    return generateStructuredData<T.EthicalAnalysis>(prompt, schema);
};

export const runXaiAnalysis = async (): Promise<T.XaiAnalysisResult> => {
    const prompt = `Generate a plausible XAI (Explainable AI) report for a recent, complex, fictional AI agent decision. The report must be in JSON format and include:
- decisionId: A unique ID for the decision.
- agent: The type of agent that made the decision.
- decision: A brief description of the decision.
- simplifiedRationale: A simple, human-understandable reason for the decision.
- factorsConsidered: A list of key data points that influenced the outcome.
- ethicalPrinciplesVerified: A list of ethical principles that were checked and passed.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            decisionId: { type: Type.STRING },
            agent: { type: Type.STRING, enum: Object.values(T.AgentType) },
            decision: { type: Type.STRING },
            simplifiedRationale: { type: Type.STRING },
            factorsConsidered: { type: Type.ARRAY, items: { type: Type.STRING } },
            ethicalPrinciplesVerified: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['decisionId', 'agent', 'decision', 'simplifiedRationale', 'factorsConsidered', 'ethicalPrinciplesVerified']
    };
    return generateStructuredData<T.XaiAnalysisResult>(prompt, schema);
};

export const runResilienceAnalysis = async (): Promise<T.ResilienceAnalysis> => {
    const prompt = `Perform a predictive resilience analysis of a complex, multi-agent AI system. Generate a JSON report containing:
- systemHealthScore: A percentage score from 85 to 99.
- predictedAnomalies: A list of 2-3 potential future failures, each with a component, description, probability (0-100), and severity (Low, Medium, High).
- recommendedActions: A list of 2-3 proactive steps to mitigate these anomalies.`;
    const schema = {
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
                        severity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
                    },
                    required: ['component', 'description', 'probability', 'severity']
                }
            },
            recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['systemHealthScore', 'predictedAnomalies', 'recommendedActions']
    };
    return generateStructuredData<T.ResilienceAnalysis>(prompt, schema);
};


// ROADMAP UPGRADES
export const runSkfUpgrade = async (): Promise<T.SkfUpgradeResult> => {
    const prompt = `Describe the upgrade of a legacy knowledge base to a "Semantic Knowledge Fabric (SKF)". The JSON response should include: upgradeSummary, newCapabilities (list), and performanceImpact.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            upgradeSummary: {type: Type.STRING},
            newCapabilities: {type: Type.ARRAY, items: {type: Type.STRING}},
            performanceImpact: {type: Type.STRING}
        },
        required: ['upgradeSummary', 'newCapabilities', 'performanceImpact']
    };
    return generateStructuredData<T.SkfUpgradeResult>(prompt, schema);
};

export const runQuantumRefinement = async (): Promise<T.QuantumRefinementResult> => {
    const prompt = `Generate a report for a quantum core tuning cycle. The JSON response should include: algorithmImprovements (list), hardwareEnhancements (list), and performanceGain.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            algorithmImprovements: {type: Type.ARRAY, items: {type: Type.STRING}},
            hardwareEnhancements: {type: Type.ARRAY, items: {type: Type.STRING}},
            performanceGain: {type: Type.STRING}
        },
        required: ['algorithmImprovements', 'hardwareEnhancements', 'performanceGain']
    };
    return generateStructuredData<T.QuantumRefinementResult>(prompt, schema);
}

export const runMarlTraining = async (): Promise<T.MarlTrainingResult> => {
    const prompt = `Simulate a Multi-Agent Reinforcement Learning (MARL) training cycle. The JSON response should identify a novel 'strategy' discovered by the agents and project the 'performanceGain'.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            strategy: { type: Type.STRING },
            performanceGain: { type: Type.STRING }
        },
        required: ['strategy', 'performanceGain']
    };
    return generateStructuredData<T.MarlTrainingResult>(prompt, schema);
};

export const runSelfEvolvingAlgorithm = async (): Promise<T.SelfEvolvingAlgorithmResult> => {
    const prompt = `Simulate a self-evolving algorithm framework completing one cycle. The JSON response should include: framework, targetModule, optimizationMethod, discoveredImprovement, performanceMetric, and projectedGain.`;
    const schema = {
        type: Type.OBJECT, properties: {
            framework: {type: Type.STRING},
            targetModule: {type: Type.STRING},
            optimizationMethod: {type: Type.STRING},
            discoveredImprovement: {type: Type.STRING},
            performanceMetric: {type: Type.STRING},
            projectedGain: {type: Type.STRING}
        },
        required: ['framework', 'targetModule', 'optimizationMethod', 'discoveredImprovement', 'performanceMetric', 'projectedGain']
    };
    return generateStructuredData<T.SelfEvolvingAlgorithmResult>(prompt, schema);
};

export const runQuantumSecurityUpgrade = async (): Promise<T.QuantumSecurityUpgradeResult> => {
    const prompt = `Describe a quantum-secure communication upgrade. The JSON response should include: upgradeSummary, protocolsImplemented (list), threatVectorMitigated, and systemImpact.`;
    const schema = {
        type: Type.OBJECT, properties: {
            upgradeSummary: {type: Type.STRING},
            protocolsImplemented: {type: Type.ARRAY, items: {type: Type.STRING}},
            threatVectorMitigated: {type: Type.STRING},
            systemImpact: {type: Type.STRING}
        },
        required: ['upgradeSummary', 'protocolsImplemented', 'threatVectorMitigated', 'systemImpact']
    };
    return generateStructuredData<T.QuantumSecurityUpgradeResult>(prompt, schema);
};

export const runNeuromorphicIntegration = async (): Promise<T.NeuromorphicIntegrationResult> => {
    const prompt = `Detail the integration of a neuromorphic co-processor. The JSON response should include: processorModel, integrationSummary, targetWorkloads (list), and performanceGains.`;
    const schema = {
        type: Type.OBJECT, properties: {
            processorModel: {type: Type.STRING},
            integrationSummary: {type: Type.STRING},
            targetWorkloads: {type: Type.ARRAY, items: {type: Type.STRING}},
            performanceGains: {type: Type.STRING}
        },
        required: ['processorModel', 'integrationSummary', 'targetWorkloads', 'performanceGains']
    };
    return generateStructuredData<T.NeuromorphicIntegrationResult>(prompt, schema);
};


// KNOWLEDGE CORE
export const runCognitiveSynthesis = async (topicA: string, topicB: string): Promise<T.CognitiveSynthesisResult> => {
    const prompt = `Synthesize a novel concept by bridging two disparate topics: "${topicA}" and "${topicB}". The JSON response must include:
- synthesis: A detailed explanation of the new, combined concept.
- emergentConcepts: A list of new ideas or terms that arise from the synthesis.
- confidenceScore: A score between 0 and 1 representing the plausibility of the synthesis.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            synthesis: {type: Type.STRING},
            emergentConcepts: {type: Type.ARRAY, items: {type: Type.STRING}},
            confidenceScore: {type: Type.NUMBER}
        },
        required: ['synthesis', 'emergentConcepts', 'confidenceScore']
    };
    return generateStructuredData<T.CognitiveSynthesisResult>(prompt, schema);
};

export const runGenerativeSimulation = async (domain: T.AgentType, scenario: string): Promise<T.GenerativeSimulationResult> => {
    const prompt = `Generate a multi-modal simulation based on the following:
- Domain: ${domain}
- Scenario: "${scenario}"
The JSON response should include:
- scenario: The original scenario description.
- simulationOutput: A detailed narrative of the simulation's outcome.
- generatedParameters: A list of key-value pairs representing important data points generated by the simulation.`;
    const schema = {
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
                        value: { type: Type.STRING }
                    },
                    required: ['key', 'value']
                }
            }
        },
        required: ['scenario', 'simulationOutput', 'generatedParameters']
    };
    return generateStructuredData<T.GenerativeSimulationResult>(prompt, schema);
};


export const runQaeAnalysis = async (): Promise<T.QaeAnalysisResult> => {
    const prompt = `Simulate the Quantum Anomaly Engine (QAE) detecting a critical system anomaly. Generate a JSON report with: anomalyId, description, source, severity (Low, Medium, High, or Critical), and a suggestedAction.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            anomalyId: {type: Type.STRING},
            description: {type: Type.STRING},
            source: {type: Type.STRING},
            severity: {type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Critical']},
            suggestedAction: {type: Type.STRING}
        },
        required: ['anomalyId', 'description', 'source', 'severity', 'suggestedAction']
    };
    return generateStructuredData<T.QaeAnalysisResult>(prompt, schema);
};
