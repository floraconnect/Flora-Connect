// src/interfaces/IAgent.ts
export interface IAgent {
    initialize(): Promise<void>;
    execute(action: string, params: any): Promise<any>;
    getStatus(): Promise<AgentStatus>;
}