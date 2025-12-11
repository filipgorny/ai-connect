import "reflect-metadata";
import { LlmProvider, ProviderResponse } from "./providers/llm-provider";
import { LlmProtocol } from "./protocol/llm-protocol";
import { LlmProtocolCommunication } from "./protocol/llm-protocol-communication";
export declare class Llm {
    private provider;
    constructor(provider: LlmProvider);
    prompt(message: string): Promise<ProviderResponse>;
    defineProtocol(protocol: LlmProtocol): LlmProtocolCommunication;
}
