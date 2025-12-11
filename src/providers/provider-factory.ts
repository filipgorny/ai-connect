import { LlmProvider } from "./llm-provider";
import { OpenAIProvider } from "./openai-provider";
import { MockProvider } from "./mock-provider";

export class ProviderFactory {
  static create(providerId: string, apiKey?: string): LlmProvider {
    switch (providerId.toUpperCase()) {
      case OpenAIProvider.PROVIDER_ID:
        if (!apiKey) {
          throw new Error("API key is required for OpenAI provider");
        }
        return new OpenAIProvider(apiKey);

      case MockProvider.PROVIDER_ID:
        return new MockProvider();

      default:
        throw new Error(`Unknown provider: ${providerId}`);
    }
  }
}
