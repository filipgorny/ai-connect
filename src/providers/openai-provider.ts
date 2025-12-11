import { LlmProvider } from "./llm-provider";
import { ProviderResponse } from "./provider-response";

export class OpenAIProvider implements LlmProvider {
  static readonly PROVIDER_ID = "OPENAI";
  private apiKey: string;
  private apiUrl = "https://api.openai.com/v1/chat/completions";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async prompt(message: string): Promise<ProviderResponse> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return new ProviderResponse(
          `API error: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }

      const data: any = await response.json();
      const content = data.choices?.[0]?.message?.content || "";

      return new ProviderResponse(content);
    } catch (error) {
      return new ProviderResponse(
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  }
}
