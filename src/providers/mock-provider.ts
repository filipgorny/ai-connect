import { LlmProvider } from "./llm-provider";
import { ProviderResponse } from "./provider-response";

export class MockProvider implements LlmProvider {
  static readonly PROVIDER_ID = "MOCK";

  private responses: ProviderResponse[] = [];
  private callIndex = 0;

  constructor(responses?: ProviderResponse[]) {
    this.responses = responses || [];
  }

  addResponse(response: ProviderResponse): void {
    this.responses.push(response);
  }

  reset(): void {
    this.responses = [];
    this.callIndex = 0;
  }

  async prompt(message: string): Promise<ProviderResponse> {
    if (this.callIndex >= this.responses.length) {
      return new ProviderResponse(
        JSON.stringify({ mock: true, receivedMessage: message }),
      );
    }

    const response = this.responses[this.callIndex];
    this.callIndex++;
    return response;
  }
}
