export interface ProviderResponse {
  success: boolean;
  message: string;
}

export interface LlmProvider {
  prompt(message: string): Promise<ProviderResponse>;
}
