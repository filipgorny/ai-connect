import { LlmProtocol } from "./llm-protocol";
import { ProviderResponse } from "../providers/llm-provider";
export interface LlmProtocolCommunication {
    prompt(message: string): Promise<any>;
}
export declare class LlmProtocolCommunicationImpl implements LlmProtocolCommunication {
    private protocol;
    private llmPromptFn;
    constructor(protocol: LlmProtocol, llmPromptFn: (message: string) => Promise<ProviderResponse>);
    prompt(message: string): Promise<any>;
}
