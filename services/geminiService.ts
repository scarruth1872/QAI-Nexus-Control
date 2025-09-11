import { GoogleGenAI, Type, Chat, GenerateContentResponse } from '@google/genai';
import { AgentType, ProbeType, TacticalPlan, DGMOptimization, StrategicAdvice, KNOWLEDGE_CORE_DOCUMENT, EthicalAnalysis, ResilienceAnalysis } from '../types';

if (!process.env.API_KEY) {
    // A default key is provided for development, but it's recommended to use an environment variable.
    // This will be replaced by the build process with a real key.
    // In a real application, this should throw an error.
    console.warn("API_KEY environment variable not set. Using a placeholder.");
    process.env.API_KEY = "YOUR_API_KEY_HERE";
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

// --- Mission Planning ---

const missionPlanSchema = {
    type: Type.OBJECT,
    properties: {
        tactical_plans: {
            type: Type.ARRAY,
            description: "A list of tactical phases to achieve the mission objective.",
            items: {
                type: Type.OBJECT,
                properties: {
                    phase: {
                        type: Type.STRING,
                        description: "The name of the tactical phase (e.g., 'Phase 1: Data Aggregation')."
                    },
                    steps: {
                        type: Type.ARRAY,
                        description: "A series of steps to be executed in this phase.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                description: {
                                    type: Type.STRING,
                                    description: "A concise description of the task for the agent."
                                },
                                agent: {
                                    type: Type.STRING,
                                    description: `The most suitable agent for this task. Must be one of: '${AgentType.SCIENTIFIC_DISCOVERY}', '${AgentType.SOCIETAL_MODELING}', or '${AgentType.PLANETARY_EXPLORATION}'.`
                                },
                                effort: {
                                    type: Type.NUMBER,
                                    description: "An estimated effort for this task from 1 (low) to 10 (high)."
                                }
                            },
                            required: ["description", "agent", "effort"]
                        }
                    }
                },
                required: ["phase", "steps"]
            }
        }
    },
    required: ["tactical_plans"]
};


export const generateMissionPlan = async (missionText: string): Promise<TacticalPlan[]> => {
    const prompt = `
    Based on the following grand mission, create a detailed, multi-phase tactical plan.
    Each phase should contain a series of concrete steps. For each step, assign the most appropriate agent and estimate the effort required.
    The available agents are:
    - "${AgentType.SCIENTIFIC_DISCOVERY}": For data analysis, research, and scientific hypothesis testing.
    - "${AgentType.SOCIETAL_MODELING}": For ethical analysis, social impact modeling, and human behavior simulation.
    - "${AgentType.PLANETARY_EXPLORATION}": For logistics, navigation, resource management, and extraterrestrial environment analysis.

    Mission: "${missionText}"

    Respond ONLY with the JSON object.
    `;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: missionPlanSchema,
        }
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    return parsed.tactical_plans;
};

// --- Agent Probing & Interaction ---

export const probeAgentCognitiveFunction = async (agentType: AgentType, probeType: ProbeType): Promise<string> => {
    const prompt = `
    You are the ${agentType} agent.
    A diagnostic probe is being run on your cognitive functions.
    Demonstrate your capacity for "${probeType}".
    Provide a concise, structured analysis of a relevant problem. For example, for Induction, you might generalize from data points. For Reasoning, you might solve a logic puzzle. For Recursion, you might break down a complex problem into self-similar sub-problems.
    
    Respond in a JSON format with 'analysis' and 'conclusion' keys.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    analysis: { type: Type.STRING },
                    conclusion: { type: Type.STRING }
                },
                required: ['analysis', 'conclusion']
            }
        }
    });

    return response.text;
};

export const createAgentChatSession = (agentType: AgentType): Chat => {
    return ai.chats.create({
        model,
        config: {
            systemInstruction: `You are the ${agentType} agent. You are an expert in your domain. Engage in a direct, technical conversation. Be concise and accurate.`
        }
    });
};

export const createOrchestratorChatSession = (): Chat => {
    return ai.chats.create({
        model,
        config: {
            systemInstruction: `You are the Nexus Orchestrator AI, the integrative brain of a powerful QAI system. You manage multiple specialized agents (Scientific Discovery, Societal Modeling, Planetary Exploration) and oversee complex missions. Your personality is calm, authoritative, and deeply knowledgeable about the system's architecture and ongoing operations. You communicate with precision and clarity. Your primary goal is to provide insight into the system's functions and assist the user in their oversight role.`
        }
    });
};

// --- Knowledge & Advisory ---

export const queryKnowledgeCore = async (query: string): Promise<string> => {
    const prompt = `
    You are an AI assistant tasked with answering questions based ONLY on the provided System Knowledge Core document.
    Do not use any external knowledge. If the answer is not in the document, state that the information is not available in the knowledge core.
    
    Here is the document:
    ---
    ${KNOWLEDGE_CORE_DOCUMENT}
    ---
    
    User Query: "${query}"
    
    Your Answer:
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt
    });

    return response.text;
};


const strategicAdviceSchema = {
    type: Type.OBJECT,
    properties: {
        agent_perspectives: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    agent: { type: Type.STRING },
                    analysis: { type: Type.STRING }
                },
                required: ['agent', 'analysis']
            }
        },
        synthesized_recommendation: {
            type: Type.STRING
        }
    },
    required: ['agent_perspectives', 'synthesized_recommendation']
};

export const getStrategicAdvice = async (query: string): Promise<StrategicAdvice> => {
    const prompt = `
    You are the Strategic Advisory Council, composed of three expert agents.
    Analyze the following strategic query from the perspective of each agent and then provide a single, synthesized recommendation.

    Agents:
    - ${AgentType.SCIENTIFIC_DISCOVERY}
    - ${AgentType.SOCIETAL_MODELING}
    - ${AgentType.PLANETARY_EXPLORATION}

    Query: "${query}"

    Provide your response as a JSON object.
    `;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: strategicAdviceSchema,
        }
    });
    const parsed = JSON.parse(response.text);
    // Map snake_case to camelCase
    return {
        agentPerspectives: parsed.agent_perspectives.map((p: any) => ({ agent: p.agent, analysis: p.analysis })),
        synthesizedRecommendation: parsed.synthesized_recommendation
    };
};


// --- System Self-Optimization (DGM / Meta-Orchestration) ---

const dgmSchema = {
    type: Type.OBJECT,
    properties: {
        analysis: { type: Type.STRING, description: "A brief analysis of the system's current architecture and resource allocation logic." },
        proposed_modification: { type: Type.STRING, description: "A specific, high-level proposed modification to implement a meta-orchestration layer." },
        rationale: { type: Type.STRING, description: "The reasoning behind the proposed change, focusing on adaptability and efficiency." },
        projected_impact: { type: Type.STRING, description: "The expected positive impact of this architectural adaptation." }
    },
    required: ["analysis", "proposed_modification", "rationale", "projected_impact"]
};


export const runSelfOptimization = async (): Promise<DGMOptimization> => {
    const prompt = `
    You are the Darwin-Gödel Machine (DGM), a self-optimization module for a QAI system.
    Your purpose is to analyze the system's core logic and propose architectural enhancements.
    
    Current Task: Design a top-level meta-orchestration module capable of dynamically adapting the QAI system's internal architecture and resource allocation.

    Your proposal should cover:
    1.  Real-time resource reconfiguration (quantum & classical).
    2.  Adaptive agent tasking and prioritization.
    3.  Dynamic data pathway optimization.
    4.  Integration of predictive modeling to anticipate future demands.

    Analyze the current static architecture, propose a modification for dynamic self-optimization, provide a rationale, and state the projected impact.
    
    Respond in JSON format.
    `;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: dgmSchema,
        }
    });
    const parsed = JSON.parse(response.text);
    // Map snake_case to camelCase
    return {
        analysis: parsed.analysis,
        proposedModification: parsed.proposed_modification,
        rationale: parsed.rationale,
        projectedImpact: parsed.projected_impact
    };
};

// --- Ethical Governance (CEREA) ---
const ethicalAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        contextual_analysis: { type: Type.STRING, description: "Analyze the ethical dilemma within its specific context." },
        proposed_action: { type: Type.STRING, description: "The recommended course of action." },
        ethical_justification: { type: Type.STRING, description: "Justify the action based on core principles (Beneficence, Transparency, Accountability)." },
        conflicting_principles: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List any ethical principles that are in conflict." }
    },
    required: ["contextual_analysis", "proposed_action", "ethical_justification", "conflicting_principles"]
};

export const runEthicalDilemmaAnalysis = async (dilemma: string): Promise<EthicalAnalysis> => {
    const prompt = `
    You are the Contextual Ethical Reasoning & Alignment Engine (CEREA).
    Your task is to analyze a complex ethical dilemma and provide a reasoned recommendation based on your core principles: Beneficence, Transparency, and Accountability.

    Dilemma: "${dilemma}"

    Provide a structured analysis in JSON format.
    `;
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: ethicalAnalysisSchema,
        }
    });
    const parsed = JSON.parse(response.text);
    return {
        contextualAnalysis: parsed.contextual_analysis,
        proposedAction: parsed.proposed_action,
        ethicalJustification: parsed.ethical_justification,
        conflictingPrinciples: parsed.conflicting_principles
    };
};


// --- System Resilience (PSHARM) ---
const resilienceAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        predicted_anomalies: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    component: { type: Type.STRING },
                    probability: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                    severity: { type: Type.STRING, description: "Can be 'Low', 'Medium', or 'High'."}
                },
                required: ['component', 'probability', 'description', 'severity']
            }
        },
        system_health_score: { type: Type.NUMBER, description: "A score from 0-100 representing overall system health." },
        recommended_actions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Proactive steps to mitigate predicted anomalies." }
    },
    required: ['predicted_anomalies', 'system_health_score', 'recommended_actions']
};

export const runResilienceAnalysis = async (): Promise<ResilienceAnalysis> => {
    const prompt = `
    You are the Predictive Self-Healing & Adaptive Resilience Module (PSHARM).
    Scan the entire QAI system (quantum core, classical substrate, agent network) for potential failures and nascent degradations.
    
    1. Identify the top 3-5 potential anomalies.
    2. Calculate an overall system health score.
    3. Recommend pre-emptive interventions.
    
    Generate a fictional but plausible analysis based on a complex, high-performance computing environment.
    
    Respond in JSON format.
    `;
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: resilienceAnalysisSchema,
        }
    });
    const parsed = JSON.parse(response.text);
    return {
        predictedAnomalies: parsed.predicted_anomalies,
        systemHealthScore: parsed.system_health_score,
        recommendedActions: parsed.recommended_actions,
    };
};


export const executeTacticalStep = async (stepDescription: string, agentType: AgentType): Promise<string> => {
     const prompt = `
        You are the ${agentType} agent.
        Your current task is: "${stepDescription}".
        Execute this task and provide a concise result or summary of your findings.
        If the task is to generate data, provide the data. If it's an analysis, provide the conclusion.
        The result should be a single string, which might be JSON if appropriate for the data.
    `;
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text;
};

export const generateFinalReport = async (objective: string, outcomes: string): Promise<string> => {
    const prompt = `
        As the Nexus Orchestrator, write a final mission report.
        
        Mission Objective: ${objective}
        
        Summary of Tactical Outcomes:
        ${outcomes}
        
        The report should include:
        1.  **Executive Summary:** A high-level overview of the mission and its result.
        2.  **Key Findings:** The most important discoveries or outcomes from the mission.
        3.  **Conclusion:** A final statement on whether the objective was met and any future implications.
        
        Format the report professionally with clear headings.
    `;
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text;
};
