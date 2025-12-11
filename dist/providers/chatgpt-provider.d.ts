import { LlmProvider, ProviderResponse } from "./llm-provider";
export declare class ChatGPTProvider implements LlmProvider {
    private apiKey;
    private apiUrl;
    constructor(apiKey: string);
    prompt(message: string): Promise<ProviderResponse>;
}
