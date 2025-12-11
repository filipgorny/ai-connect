"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmProtocolCommunicationImpl = void 0;
class LlmProtocolCommunicationImpl {
    constructor(protocol, llmPromptFn) {
        this.protocol = protocol;
        this.llmPromptFn = llmPromptFn;
    }
    async prompt(message) {
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
        }
        catch (error) {
            throw new Error(`Failed to parse LLM response: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
}
exports.LlmProtocolCommunicationImpl = LlmProtocolCommunicationImpl;
