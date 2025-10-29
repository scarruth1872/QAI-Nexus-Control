// Fix: Added full implementation of Gemini API service functions.
import { GoogleGenAI, Type, GenerateContentResponse, Part, Content } from "@google/genai";
import { Mission, FinalReportData, Shipment, QuantumExperimentResult, SimulationResult, BioAssayResult, ProteinFoldingResult, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Schemas for structured responses
const missionPlanSchema = {
    type: Type.OBJECT,
    properties: {
        objective: { type: Type.STRING },
        tasks: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    description: { type: Type.STRING },
                    agentId: { type: Type.STRING },
                    status: { type: Type.STRING, enum: ['PENDING'] },
                },
                required: ['id', 'description', 'agentId', 'status'],
            },
        },
        status: { type: Type.STRING, enum: ['PLANNING'] },
    },
    required: ['objective', 'tasks', 'status'],
};

const finalReportSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING },
        outcomes: { type: Type.ARRAY, items: { type: Type.STRING } },
        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ['summary', 'outcomes', 'recommendations'],
};

const quantumExperimentSchema = {
    type: Type.OBJECT,
    properties: {
        algorithmName: { type: Type.STRING },
        description: { type: Type.STRING },
        circuitVisualization: { type: Type.STRING, description: "A simple ASCII or Qiskit-like text representation of the quantum circuit." },
        simulatedResult: { type: Type.STRING },
    },
    required: ['algorithmName', 'description', 'circuitVisualization', 'simulatedResult'],
};

const nanomaterialSimulationSchema = {
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
            required: ['stability', 'conductivity', 'tensileStrength'],
        },
        synthesisNotes: { type: Type.STRING },
        applications: { type: Type.ARRAY, items: { type: Type.STRING } },
        fabricationInstructions: { type: Type.STRING },
    },
    required: ['materialName', 'predictedProperties', 'synthesisNotes', 'applications', 'fabricationInstructions'],
};

const bioAssaySchema = {
    type: Type.OBJECT,
    properties: {
        biocompatibility: {
            type: Type.OBJECT,
            properties: {
                assessment: { type: Type.STRING },
                notes: { type: Type.STRING },
            },
            required: ['assessment', 'notes'],
        },
        computationalAnalysis: { type: Type.STRING },
        biologicalProtocol: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    step: { type: Type.NUMBER },
                    action: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    reagents: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['step', 'action', 'duration', 'reagents'],
            },
        },
    },
    required: ['biocompatibility', 'computationalAnalysis', 'biologicalProtocol'],
};

const proteinFoldingSchema = {
    type: Type.OBJECT,
    properties: {
        targetProtein: { type: Type.STRING },
        predictedStructure: { type: Type.STRING },
        bindingAffinity: { type: Type.STRING },
        therapeuticPotential: { type: Type.STRING },
    },
    required: ['targetProtein', 'predictedStructure', 'bindingAffinity', 'therapeuticPotential'],
};


// Helper function to call the API and parse JSON
async function generateJson<T>(prompt: string, schema: object): Promise<T> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });
    return JSON.parse(response.text) as T;
}

async function generateText(prompt: string): Promise<string> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text;
}

// Service functions
export async function generateMissionPlan(objective: string, agentRoles: string): Promise<Omit<Mission, 'report'>> {
    const prompt = `
        As an advanced AI mission orchestrator, create a mission plan to achieve the following objective: "${objective}".
        
        You have the following agent roles available:
        ${agentRoles}

        Assign tasks to specific agent IDs based on their role (e.g., assign a logistics task to an agent with 'Logistics' in their name).
        The plan should be a JSON object with 'objective', 'tasks' (an array of task objects with id, description, agentId, and status='PENDING'), and status='PLANNING'.
        Task IDs should be in the format "T-001", "T-002", etc.
        Keep descriptions concise and actionable.
    `;
    return generateJson<Omit<Mission, 'report'>>(prompt, missionPlanSchema);
}

export async function generateMissionCompletionReport(objective: string, tasks: any[]): Promise<FinalReportData> {
    const taskSummary = tasks.map(t => `- ${t.description} (Agent: ${t.agentId}, Status: ${t.status}, Result: ${t.result || 'N/A'})`).join('\n');
    const prompt = `
        The mission with the objective "${objective}" has concluded. 
        Here is a summary of the tasks performed:
        ${taskSummary}

        Generate a final report in JSON format. The report should include a 'summary' of the mission's execution, a list of key 'outcomes', and a list of 'recommendations' for future operations.
    `;
    return generateJson<FinalReportData>(prompt, finalReportSchema);
}

export async function getTacticalSuggestion(prompt: string): Promise<string> {
    return generateText(`As a tactical AI, provide a concise, informative response for the following request: "${prompt}"`);
}

export async function summarizeTextForKnowledgeBase(text: string): Promise<string> {
    const prompt = `
        Summarize the following text into a concise knowledge base entry. Extract the most critical information and present it as a clear, structured summary.
        Text to summarize:
        ---
        ${text}
        ---
    `;
    return generateText(prompt);
}

export async function generateMissionExplanation(mission: Mission): Promise<string> {
    const prompt = `
        As an Explainable AI (XAI) module, explain the strategic rationale behind the current mission plan.
        Objective: ${mission.objective}
        Tasks: ${JSON.stringify(mission.tasks, null, 2)}
        Provide a clear, high-level explanation of why this plan was chosen to meet the objective.
    `;
    return generateText(prompt);
}

export async function generateImageFromPrompt(prompt: string): Promise<string> {
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
}

// Convert our app's ChatMessage to Gemini's Content format
const toGeminiContent = (history: ChatMessage[]): Content[] => {
    return history.map(msg => {
        const role = msg.sender === 'user' ? 'user' : 'model';
        // The orchestrator is the 'model' in this context
        if (msg.sender === 'orchestrator') {
            return { role: 'model', parts: [{ text: msg.text }] };
        }
        return { role, parts: [{ text: msg.text }] };
    });
};

export async function getOrchestratorResponse(history: ChatMessage[], newMessage: string): Promise<string> {
    const contents: Content[] = [
        ...toGeminiContent(history),
        { role: 'user', parts: [{ text: newMessage }] }
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: 'You are the central AI orchestrator for a high-tech command center. Be concise and authoritative.'
        }
    });
    
    return response.text;
}

export async function getQuantumAlgorithmSuggestion(problem: string): Promise<QuantumExperimentResult> {
    const prompt = `
        For the research problem "${problem}", design a suitable quantum algorithm. 
        Provide the output as a JSON object containing:
        - algorithmName: The name of the algorithm (e.g., "Variational Quantum Eigensolver").
        - description: A brief explanation of why this algorithm is suitable.
        - circuitVisualization: A simple ASCII text representation of the core quantum circuit.
        - simulatedResult: A plausible, concise summary of the expected outcome from the simulation.
    `;
    return generateJson<QuantumExperimentResult>(prompt, quantumExperimentSchema);
}

export async function getNanomaterialSimulationSuggestion(prompt: string): Promise<SimulationResult> {
    const fullPrompt = `
        Based on the desired properties "${prompt}", simulate the creation of a novel nanomaterial.
        Provide the output as a JSON object with the following fields:
        - materialName: A plausible scientific name for the material.
        - predictedProperties: An object with 'stability', 'conductivity', and 'tensileStrength' strings.
        - synthesisNotes: Brief notes on the simulated synthesis process.
        - applications: An array of strings with potential applications.
        - fabricationInstructions: A concise string of instructions for the fabricator.
    `;
    return generateJson<SimulationResult>(fullPrompt, nanomaterialSimulationSchema);
}

export async function getMaterialCharacterization(materialName: string, tool: 'SEM' | 'TEM' | 'XRD'): Promise<string> {
    const prompt = `Provide a simulated characterization result for the material "${materialName}" using a ${tool} (Scanning Electron Microscope, Transmission Electron Microscope, or X-ray Diffraction). The result should be a short, scientific-sounding paragraph.`;
    return generateText(prompt);
}

export async function getBioAssaySuggestion(prompt: string): Promise<BioAssayResult> {
    const fullPrompt = `
        For the bioinformatics research prompt "${prompt}", provide a detailed analysis and experimental plan.
        The output must be a JSON object containing:
        - biocompatibility: An object with an 'assessment' (e.g., "High", "Medium", "Low") and explanatory 'notes'.
        - computationalAnalysis: A summary of the simulated findings.
        - biologicalProtocol: An array of steps for a lab protocol, each with 'step' (number), 'action' (string), 'duration' (string), and 'reagents' (array of strings).
    `;
    return generateJson<BioAssayResult>(fullPrompt, bioAssaySchema);
}

export async function getProteinFoldingSuggestion(proteinName: string): Promise<ProteinFoldingResult> {
    const prompt = `
        Simulate the folding of the protein "${proteinName}" using quantum-inspired algorithms.
        Provide the result as a JSON object with:
        - targetProtein: The name of the protein.
        - predictedStructure: A brief description of the predicted structure (e.g., "Alpha-helical dominant with a stable beta-sheet core").
        - bindingAffinity: A plausible measure of binding affinity.
        - therapeuticPotential: A concise summary of its therapeutic potential.
    `;
    return generateJson<ProteinFoldingResult>(prompt, proteinFoldingSchema);
}

export async function getLogisticsRerouteSuggestion(shipment: Shipment): Promise<string> {
    const prompt = `
        A logistics shipment is delayed.
        ID: ${shipment.id}
        Origin: ${shipment.origin}
        Destination: ${shipment.destination}
        Current Location: Near ${shipment.currentLocation.lat}, ${shipment.currentLocation.lon}
        
        Provide a concise, actionable rerouting suggestion to mitigate the delay.
    `;
    return generateText(prompt);
}