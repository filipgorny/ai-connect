import { LlmProvider, ProviderResponse } from "./llm-provider";

export class ChatGPTProvider implements LlmProvider {
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
        return {
          success: false,
          message: `API error: ${response.status} ${response.statusText}`,
        };
      }

      const data: any = await response.json();
      const content = data.choices?.[0]?.message?.content || "";

      return {
        success: true,
        message: content,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
