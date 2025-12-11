import { LlmProtocol } from "./llm-protocol";
import { ProviderResponse } from "../providers/llm-provider";

export interface LlmProtocolCommunication {
  prompt(message: string): Promise<any>;
}

export class LlmProtocolCommunicationImpl implements LlmProtocolCommunication {
  constructor(
    private protocol: LlmProtocol,
    private llmPromptFn: (message: string) => Promise<ProviderResponse>,
  ) {}

  async prompt(message: string): Promise<any> {
    const enhancedMessage = message + this.protocol.buildPromptSuffix();
    const response = await this.llmPromptFn(enhancedMessage);

    if (!response.success) {
      throw new Error(`LLM call failed: ${response.message}`);
    }

    try {
      // Try to extract JSON from response
      const jsonMatch = response.message.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in LLM response");
      }
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      throw new Error(
        `Failed to parse LLM response: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
