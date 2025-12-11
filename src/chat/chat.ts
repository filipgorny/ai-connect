import { LlmProvider } from "@/providers/llm-provider";
import { ChatResponse } from "./chat-response";

export class Chat {
  constructor(private provider: LlmProvider) {}

  async message(message: string): Promise<ChatResponse> {
    const response = await this.provider.prompt(message);
    return new ChatResponse(response.raw);
  }
}
