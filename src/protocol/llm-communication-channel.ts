import { LlmProtocol } from "./llm-protocol";
import { LlmProvider } from "../providers/llm-provider";
import { ProtocolResponse } from "./protocol-response";
import { OutputFieldValue } from "./output-field-value";
import { ChannelInput } from "./channel-input";

export class LlmCommunicationChannel {
  constructor(
    private protocol: LlmProtocol,
    private provider: LlmProvider,
  ) {}

  private validateInput(input: ChannelInput): void {
    const inputFields = this.protocol.getInputFields();
    for (const field of inputFields) {
      if (input.get(field.name) === undefined) {
        throw new Error(`Missing required input field: ${field.name}`);
      }
    }
  }

  async send(message: Record<string, string>): Promise<ProtocolResponse> {
    // Create ChannelInput from plain object and validate
    const channelInput = new ChannelInput(message);
    this.validateInput(channelInput);

    // Build structured message from ChannelInput
    const inputPrompt = this.protocol.buildInputPrompt(channelInput.toObject());
    const promptMessage = inputPrompt;

    // Add output format instructions
    const enhancedMessage =
      promptMessage + this.protocol.buildOutputPromptSuffix();

    // Call the provider
    const response = await this.provider.prompt(enhancedMessage);

    // Parse and return the response
    try {
      const jsonMatch = response.raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in LLM response");
      }
      const parsed = JSON.parse(jsonMatch[0]);
      const fields: OutputFieldValue[] = Object.entries(parsed).map(
        ([name, value]) => new OutputFieldValue(name, String(value)),
      );
      return new ProtocolResponse(response.raw, fields);
    } catch (error) {
      throw new Error(
        `Failed to parse LLM response: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
