import "reflect-metadata";
import { LlmProvider, ProviderResponse } from "./providers/llm-provider";
import { LlmProtocol } from "./protocol/llm-protocol";
import { LlmCommunicationChannel } from "./protocol/llm-communication-channel";
export declare class Llm {
    private provider;
    constructor(provider: LlmProvider);
    prompt(message: string): Promise<ProviderResponse>;
    createProtocolChannel(protocol: LlmProtocol): LlmCommunicationChannel;
}
