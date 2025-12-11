import { ProviderResponse } from "./provider-response";

export { ProviderResponse };

export interface LlmProvider {
  prompt(message: string): Promise<ProviderResponse>;
}
