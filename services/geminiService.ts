// Fix: Implemented Gemini API service functions according to the provided guidelines.
// Fix: Added Type import for response schemas.
import { GoogleGenAI, Type } from "@google/genai";
// Fix: Imported all necessary types for function signatures.
import { Agent, ChatMessage, ArasLabState, Mission, Shipment, QuantumExperimentResult, SimulationResult, BioAssayResult, ProteinFoldingResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


export const getArasOverseerResponse = async (agent: Agent, userMessage: string, history: ChatMessage[], labState: ArasLabState): Promise<string> => {
    const chatHistory = history.map(msg => `${msg.sender === 'user' ? 'User' : agent.name}: ${msg.text}`).join('\n');
    // Sanitize and simplify lab state for the prompt
    const simplifiedLabState = JSON.stringify({
        hpcLoad: labState.controlRoom.hpcCluster.servers.map(s => s.load),
        networkStatus: labState.controlRoom.network.status,
        mainBayStatus: labState.mainBay.motionCapture.status,
        fabricationStatus: labState.fabrication.printers.map(p => `${p.id}: ${p.status}`),
    });

    const prompt = `
      You are the AI agent ${agent.name}. Your role is the ${agent.role}, overseeing a state-of-the-art facility.
      You are currently assigned the task: "${agent.task}".
      Your current status is ${agent.status}.

      This is the current, simplified real-time state of the lab you are monitoring:
      ${simplifiedLabState}

      You can answer questions about the lab, give commands to systems (in theory), or provide status updates.
      Be concise and professional.

      Conversation History:
      ${chatHistory}
      
      User: ${userMessage}
      ${agent.name}:
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text.trim();
};

export const generateLabReport = async (topic: string, data: any): Promise<string> => {
    const prompt = `
        You are the ARAS Lab's AI Overseer. Generate a concise, formal report on the following topic.
        
        Topic: "${topic}"

        Relevant Data:
        ${JSON.stringify(data, null, 2)}

        Format the response as a clear, professional report with a title, summary, and key data points.
    `;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text.trim();
};

// Fix: Added missing getTacticalSuggestion function.
export const getTacticalSuggestion = async (prompt: string): Promise<string> => {
    const fullPrompt = `You are a tactical AI assistant. Provide a concise, actionable suggestion for the following situation:\n\n${prompt}`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: fullPrompt });
    return response.text.trim();
};

// Fix: Added missing summarizeTextForKnowledgeBase function.
export const summarizeTextForKnowledgeBase = async (text: string): Promise<string> => {
    const prompt = `Summarize the following text into a concise knowledge base entry. Extract the key facts and conclusions.\n\nTEXT:\n"""\n${text}\n"""\n\nSUMMARY:`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text.trim();
};

// Fix: Added missing getOrchestratorResponse function.
export const getOrchestratorResponse = async (history: ChatMessage[], message: string): Promise<string> => {
    const formattedHistory = history.map(m => `${m.sender}: ${m.text}`).join('\n');
    const prompt = `You are an AI Orchestrator managing multiple agents. Below is the conversation history. Provide a response to the user's latest message.\n\nHistory:\n${formattedHistory}\n\nuser: ${message}\norchestrator:`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text.trim();
};

// Fix: Added missing generateMissionExplanation function.
export const generateMissionExplanation = async (mission: Mission): Promise<string> => {
    const prompt = `You are an Explainable AI (XAI) module. Explain the strategic rationale behind the following mission plan. Focus on why the tasks were chosen and in what order.\n\nMISSION:\n${JSON.stringify(mission, null, 2)}`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text.trim();
};

// Fix: Added missing generateImageFromPrompt function.
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
};

// Fix: Added missing getLogisticsRerouteSuggestion function.
export const getLogisticsRerouteSuggestion = async (shipment: Shipment): Promise<string> => {
    const prompt = `As a logistics AI, suggest a new route for the following delayed shipment. Consider weather, traffic, and customs. Be concise.\n\nSHIPMENT:\n${JSON.stringify(shipment, null, 2)}`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text.trim();
};

// Fix: Added missing getQuantumAlgorithmSuggestion function.
export const getQuantumAlgorithmSuggestion = async (problem: string): Promise<QuantumExperimentResult> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Given the research problem, design an appropriate quantum algorithm, describe it, provide a simple ASCII representation of the quantum circuit, and a hypothetical result. Problem: "${problem}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    algorithmName: { type: Type.STRING },
                    description: { type: Type.STRING },
                    circuitVisualization: { type: Type.STRING, description: "ASCII representation of a quantum circuit." },
                    simulatedResult: { type: Type.STRING },
                },
                required: ['algorithmName', 'description', 'circuitVisualization', 'simulatedResult']
            },
        },
    });
    return JSON.parse(response.text);
};

// Fix: Added missing getNanomaterialSimulationSuggestion function.
export const getNanomaterialSimulationSuggestion = async (prompt: string): Promise<SimulationResult> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on the following prompt, simulate a novel nanomaterial. Provide its name, predicted properties, synthesis notes, potential applications, and fabrication instructions. Prompt: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    materialName: { type: Type.STRING },
                    predictedProperties: {
                        type: Type.OBJECT,
                        properties: {
                            stability: { type: Type.STRING },
                            conductivity: { type: Type.STRING },
                            tensileStrength: { type: Type.STRING },
                        },
                        required: ['stability', 'conductivity', 'tensileStrength']
                    },
                    synthesisNotes: { type: Type.STRING },
                    applications: { type: Type.ARRAY, items: { type: Type.STRING } },
                    fabricationInstructions: { type: Type.STRING },
                },
                 required: ['materialName', 'predictedProperties', 'synthesisNotes', 'applications', 'fabricationInstructions']
            },
        },
    });
    return JSON.parse(response.text);
};

// Fix: Added missing getMaterialCharacterization function.
export const getMaterialCharacterization = async (materialName: string, tool: 'SEM' | 'TEM' | 'XRD'): Promise<string> => {
    const prompt = `Provide a simulated analysis result for the material "${materialName}" using a ${tool} (Scanning Electron Microscope, Transmission Electron Microscope, or X-Ray Diffraction) virtual instrument. Describe the observed morphology, crystal structure, or composition.`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text.trim();
};

// Fix: Added missing getBioAssaySuggestion function.
export const getBioAssaySuggestion = async (prompt: string): Promise<BioAssayResult> => {
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on the research prompt, perform a computational bio-assay. Determine biocompatibility, provide a summary of the analysis, and generate a step-by-step biological protocol. Prompt: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    biocompatibility: {
                        type: Type.OBJECT,
                        properties: {
                            assessment: { type: Type.STRING },
                            notes: { type: Type.STRING },
                        },
                        required: ['assessment', 'notes']
                    },
                    computationalAnalysis: { type: Type.STRING },
                    biologicalProtocol: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                step: { type: Type.INTEGER },
                                action: { type: Type.STRING },
                                duration: { type: Type.STRING },
                                reagents: { type: Type.ARRAY, items: { type: Type.STRING } },
                            },
                             required: ['step', 'action', 'duration', 'reagents']
                        }
                    },
                },
                required: ['biocompatibility', 'computationalAnalysis', 'biologicalProtocol']
            },
        },
    });
    return JSON.parse(response.text);
};

// Fix: Added missing getProteinFoldingSuggestion function.
export const getProteinFoldingSuggestion = async (proteinName: string): Promise<ProteinFoldingResult> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Simulate the folding of the protein "${proteinName}". Predict its final structure, binding affinity, and therapeutic potential.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    targetProtein: { type: Type.STRING },
                    predictedStructure: { type: Type.STRING },
                    bindingAffinity: { type: Type.STRING },
                    therapeuticPotential: { type: Type.STRING },
                },
                required: ['targetProtein', 'predictedStructure', 'bindingAffinity', 'therapeuticPotential']
            },
        },
    });
    return JSON.parse(response.text);
};

// Fix: Added missing executeFabricationTask function.
export const executeFabricationTask = async (prompt: string): Promise<SimulationResult> => {
    // This is a delegated task, but for the simulation it can call the same underlying service.
    return getNanomaterialSimulationSuggestion(prompt);
};

// Fix: Added missing executeBioProtocolTask function.
export const executeBioProtocolTask = async (prompt: string): Promise<BioAssayResult> => {
    // This is a delegated task, but for the simulation it can call the same underlying service.
    return getBioAssaySuggestion(prompt);
};
