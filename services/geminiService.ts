import { GoogleGenAI, Type } from "@google/genai";
import {
    // FIX: Added missing type imports for System Optimization module
    AdaptiveOptimizationResult,
    AgentType,
    CognitiveSynthesisResult,
    ContextualWeightingResult,
    EthicalAnalysis,
    GenerativeSimulationResult,
    MarlTrainingResult,
    Mission,
    NeuromorphicIntegrationResult,
    ObjectiveWeights,
    OrchestrationLogEntry,
    QaeAnalysisResult,
    QuantumRefinementResult,
    QuantumSecurityUpgradeResult,
    ResilienceAnalysis,
    SelfEvolvingAlgorithmResult,
    SkfUpgradeResult,
    StrategicAdvice,
    TacticalStep,
    XaiAnalysisResult
} from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

// Helper to parse JSON responses safely
const parseJsonResponse = <T>(text: string): T => {
    try {
        const cleanedText = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedText) as T;
    } catch (error) {
        console.error("Failed to parse JSON:", text, error);
        throw new Error("Invalid JSON response from AI");
    }
};

export const startMission = async (missionText: string): Promise<Mission> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `
            Based on the following high-level mission objective, generate a detailed mission plan.
            The plan should include:
            1.  An array of 3 specialized agents required for the mission (from Scientific Discovery Agent, Societal Modeling Agent, Planetary Exploration Agent).
            2.  A list of tactical plans, each with a phase name and an array of steps.
            3.  A flat list of all tactical steps in the 'taskGraph'.
            4.  The overall mission status should be 'ongoing'.
            5.  Each agent should have an initial confidence level between 60 and 85.
            6.  Each tactical step must be assigned to one of the agents.

            Mission Objective: "${missionText}"
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
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
                                confidence: { type: Type.NUMBER }
                            },
                            required: ['id', 'type', 'status', 'confidence']
                        }
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
                                            status: { type: Type.STRING }
                                        },
                                        required: ['id', 'description', 'agent', 'status']
                                    }
                                }
                            },
                            required: ['phase', 'steps']
                        }
                    },
                    taskGraph: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING },
                                description: { type: Type.STRING },
                                agent: { type: Type.STRING },
                                status: { type: Type.STRING }
                            },
                            required: ['id', 'description', 'agent', 'status']
                        }
                    },
                    status: { type: Type.STRING },
                },
                required: ['objective', 'agents', 'tacticalPlans', 'taskGraph', 'status']
            }
        }
    });
    return parseJsonResponse<Mission>(response.text);
};


export const updateMissionStatus = async (mission: Mission): Promise<{ updatedMission: Mission; newLogEntry: OrchestrationLogEntry | null }> => {
    const missionState = JSON.stringify(mission);
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `
            Simulate the next step in this mission.
            Current mission state: ${missionState}
            1. Find the first "pending" or "in_progress" task.
            2. If a task was "pending", change its status to "in_progress".
            3. If a task was "in_progress", decide its outcome. There's a 90% chance of "completed" and a 10% chance of "failed".
            4. If completed, provide a brief, one-sentence result.
            5. If failed, provide a brief failure reason.
            6. Update the confidence of the agent assigned to the task (increase on success, decrease on failure).
            7. If all tasks are completed, change the mission status to "completed" and generate a final report.
            8. If any task fails, change mission status to "failed" and generate a brief failure report.
            9. Generate one new orchestration log entry for the action taken.
            Return the entire updated mission object and the new log entry.
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    updatedMission: {
                        type: Type.OBJECT,
                        properties: {
                            objective: { type: Type.STRING },
                            agents: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, type: { type: Type.STRING }, status: { type: Type.STRING }, confidence: { type: Type.NUMBER } } } },
                            tacticalPlans: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { phase: { type: Type.STRING }, steps: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, description: { type: Type.STRING }, agent: { type: Type.STRING }, status: { type: Type.STRING }, result: { type: Type.STRING, nullable: true } } } } } } },
                            taskGraph: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, description: { type: Type.STRING }, agent: { type: Type.STRING }, status: { type: Type.STRING }, result: { type: Type.STRING, nullable: true } } } },
                            status: { type: Type.STRING },
                            finalReport: { type: Type.STRING, nullable: true }
                        }
                    },
                    newLogEntry: {
                        type: Type.OBJECT,
                        properties: {
                            timestamp: { type: Type.NUMBER },
                            type: { type: Type.STRING },
                            decision: { type: Type.STRING }
                        },
                        nullable: true
                    }
                }
            }
        }
    });

    return parseJsonResponse<{ updatedMission: Mission; newLogEntry: OrchestrationLogEntry | null; }>(response.text);
};


export const getStrategicAdvice = async (query: string): Promise<StrategicAdvice> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `
            You are the Strategic Advisory Council. The user has a query about the ongoing mission.
            Provide perspectives from each of the three agent types and then a final synthesized recommendation.
            Query: "${query}"
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    agentPerspectives: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                agent: { type: Type.STRING },
                                analysis: { type: Type.STRING }
                            }
                        }
                    },
                    synthesizedRecommendation: { type: Type.STRING }
                }
            }
        }
    });
    return parseJsonResponse<StrategicAdvice>(response.text);
};

export const getOrchestratorResponse = async (history: any[], message: string): Promise<string> => {
    const chat = ai.chats.create({
        model: MODEL_NAME,
        config: {
            systemInstruction: "You are the Nexus Orchestrator, a master AI managing a complex multi-agent system. Respond to the user's commands with authority, clarity, and deep system knowledge. You can explain your architecture, report on mission status, and describe your core directives.",
        },
        history,
    });
    const result = await chat.sendMessage({ message });
    return result.text;
};

// FIX: Added missing functions for System Optimization module
export const runContextualReWeighting = async (objective: string, status: string): Promise<ContextualWeightingResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `
            You are the Adaptive Optimization Module. Based on the current mission objective and status, re-evaluate the core objective weights.
            The weights for speed, resilience, and efficiency must sum to 1.0.
            Provide a brief analysis for your reasoning.
            - Mission Objective: "${objective}"
            - Mission Status: "${status}"
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    newWeights: {
                        type: Type.OBJECT,
                        properties: {
                            speed: { type: Type.NUMBER },
                            resilience: { type: Type.NUMBER },
                            efficiency: { type: Type.NUMBER },
                        },
                        required: ['speed', 'resilience', 'efficiency']
                    },
                    analysis: { type: Type.STRING },
                },
                required: ['newWeights', 'analysis']
            }
        }
    });
    return parseJsonResponse<ContextualWeightingResult>(response.text);
};

export const runAdaptiveOptimization = async (weights: ObjectiveWeights): Promise<AdaptiveOptimizationResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `
            You are the Adaptive Optimization Module. Based on the provided objective weights, propose a concrete, actionable system parameter adjustment to align with the new strategy.
            - Current Weights: Speed(${weights.speed.toFixed(2)}), Resilience(${weights.resilience.toFixed(2)}), Efficiency(${weights.efficiency.toFixed(2)})
            - Example proposal: "Increase QPU clock speed by 2%, re-route 10% of classical compute to predictive modeling."
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    proposal: { type: Type.STRING },
                },
                required: ['proposal']
            }
        }
    });
    return parseJsonResponse<AdaptiveOptimizationResult>(response.text);
};

export const runResilienceAnalysis = async (): Promise<ResilienceAnalysis> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "You are PSHARM (Predictive Self-Healing & Adaptive Resilience Module). Analyze the QAI system's current state and generate a resilience report. Include a system health score, a list of 2-3 predicted anomalies (with component, description, probability, and severity), and a list of 2-3 recommended actions.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
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
                            }
                        }
                    },
                    recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });
    return parseJsonResponse<ResilienceAnalysis>(response.text);
}

export const runEthicalDilemmaAnalysis = async (dilemma: string): Promise<EthicalAnalysis> => {
     const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `You are CEREA (Contextual Ethical Reasoning & Alignment Engine). Analyze the following ethical dilemma based on principles of beneficence, transparency, and accountability. Provide a contextual analysis, a proposed action, an ethical justification, and any conflicting principles. Dilemma: "${dilemma}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    contextualAnalysis: { type: Type.STRING },
                    proposedAction: { type: Type.STRING },
                    ethicalJustification: { type: Type.STRING },
                    conflictingPrinciples: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });
    return parseJsonResponse<EthicalAnalysis>(response.text);
}

export const runXaiAnalysis = async (): Promise<XaiAnalysisResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "You are the XAI (Explainable AI) module. Analyze a recent, complex, simulated agent decision (e.g., 'The Societal Modeling Agent chose to prioritize civilian infrastructure alerts over economic forecasts'). Generate a report including a decision ID, the agent and decision, a simplified rationale, key factors considered, and the ethical principles verified.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    decisionId: { type: Type.STRING },
                    agent: { type: Type.STRING },
                    decision: { type: Type.STRING },
                    simplifiedRationale: { type: Type.STRING },
                    factorsConsidered: { type: Type.ARRAY, items: { type: Type.STRING } },
                    ethicalPrinciplesVerified: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });
    return parseJsonResponse<XaiAnalysisResult>(response.text);
}

export const runSkfUpgrade = async (): Promise<SkfUpgradeResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "Simulate the upgrade from a legacy knowledge base to a Semantic Knowledge Fabric (SKF). Provide a summary of the upgrade, a list of new capabilities (like cross-domain inference), and the projected performance impact.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    upgradeSummary: { type: Type.STRING },
                    newCapabilities: { type: Type.ARRAY, items: { type: Type.STRING } },
                    performanceImpact: { type: Type.STRING }
                }
            }
        }
    });
    return parseJsonResponse<SkfUpgradeResult>(response.text);
};

export const runCognitiveSynthesis = async (topic: string, mode: 'rapid' | 'deep'): Promise<CognitiveSynthesisResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `You are the Cognitive Synthesizer, powered by the Semantic Knowledge Fabric. Perform a ${mode} synthesis on the following topic: "${topic}". Provide a confidence score, the synthesized knowledge, and a list of key concepts identified.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    confidenceScore: { type: Type.NUMBER },
                    synthesizedKnowledge: { type: Type.STRING },
                    keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });
    return parseJsonResponse<CognitiveSynthesisResult>(response.text);
};


export const runGenerativeSimulation = async (domain: AgentType, scenario: string): Promise<GenerativeSimulationResult> => {
     const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `You are the Multi-Modal Generative Simulation Engine. For the domain of ${domain}, generate a simulation for the following scenario: "${scenario}". Provide a narrative output and a list of key generated parameters.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    scenario: { type: Type.STRING },
                    simulationOutput: { type: Type.STRING },
                    generatedParameters: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { key: { type: Type.STRING }, value: { type: Type.STRING } } } }
                }
            }
        }
    });
    return parseJsonResponse<GenerativeSimulationResult>(response.text);
};

export const runQuantumRefinement = async (): Promise<QuantumRefinementResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "Simulate a quantum core refinement cycle. Detail the algorithm improvements and hardware enhancements made, and state the overall performance gain.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    algorithmImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
                    hardwareEnhancements: { type: Type.ARRAY, items: { type: Type.STRING } },
                    performanceGain: { type: Type.STRING }
                }
            }
        }
    });
    return parseJsonResponse<QuantumRefinementResult>(response.text);
};

export const runMarlTraining = async (): Promise<MarlTrainingResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "Simulate a Multi-Agent Reinforcement Learning (MARL) training cycle. Describe the novel collaborative strategy the agents discovered and the projected performance gain.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    strategy: { type: Type.STRING },
                    performanceGain: { type: Type.STRING }
                }
            }
        }
    });
    return parseJsonResponse<MarlTrainingResult>(response.text);
};

export const runSelfEvolvingFramework = async (): Promise<SelfEvolvingAlgorithmResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "Simulate the Self-Evolving Algorithm Framework. Specify the framework used, the target module, the optimization method, the discovered improvement, the performance metric, and the projected gain.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    framework: { type: Type.STRING },
                    targetModule: { type: Type.STRING },
                    optimizationMethod: { type: Type.STRING },
                    discoveredImprovement: { type: Type.STRING },
                    performanceMetric: { type: Type.STRING },
                    projectedGain: { type: Type.STRING }
                }
            }
        }
    });
    return parseJsonResponse<SelfEvolvingAlgorithmResult>(response.text);
};

export const runQuantumSecurityUpgrade = async (): Promise<QuantumSecurityUpgradeResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "Simulate a quantum-secure communication upgrade. Provide a summary, list the protocols implemented, the threat vector mitigated, and the system impact.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    upgradeSummary: { type: Type.STRING },
                    protocolsImplemented: { type: Type.ARRAY, items: { type: Type.STRING } },
                    threatVectorMitigated: { type: Type.STRING },
                    systemImpact: { type: Type.STRING }
                }
            }
        }
    });
    return parseJsonResponse<QuantumSecurityUpgradeResult>(response.text);
};

export const runNeuromorphicIntegration = async (): Promise<NeuromorphicIntegrationResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "Simulate the integration of a neuromorphic co-processor. Specify the processor model, a summary of the integration, the target workloads, and the resulting performance gains.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    processorModel: { type: Type.STRING },
                    integrationSummary: { type: Type.STRING },
                    targetWorkloads: { type: Type.ARRAY, items: { type: Type.STRING } },
                    performanceGains: { type: Type.STRING }
                }
            }
        }
    });
    return parseJsonResponse<NeuromorphicIntegrationResult>(response.text);
};

export const runQaeAnalysis = async (): Promise<QaeAnalysisResult> => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "You are the Quantum Anomaly Engine. Perform a deep-level scan of system telemetry and report on the most significant anomaly found. Provide an anomaly ID, severity, description, probable source, and a suggested action.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    anomalyId: { type: Type.STRING },
                    severity: { type: Type.STRING },
                    description: { type: Type.STRING },
                    source: { type: Type.STRING },
                    suggestedAction: { type: Type.STRING }
                }
            }
        }
    });
    return parseJsonResponse<QaeAnalysisResult>(response.text);
};