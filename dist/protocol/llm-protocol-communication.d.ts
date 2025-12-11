import { LlmProtocol } from "./llm-protocol";
import { LlmProvider } from "../providers/llm-provider";
export type Message = string | Record<string, any>;
export declare class LlmProtocolCommunication {
    private protocol;
    private provider;
    constructor(protocol: LlmProtocol, provider: LlmProvider);
    send(message: Message): Promise<any>;
}
