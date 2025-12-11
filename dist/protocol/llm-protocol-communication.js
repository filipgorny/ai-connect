"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmProtocolCommunication = void 0;
class LlmProtocolCommunication {
    constructor(protocol, provider) {
        this.protocol = protocol;
        this.provider = provider;
    }
    async send(message) {
        let promptMessage;
        // Build the prompt based on message type
        if (typeof message === "string") {
            promptMessage = message;
        }
        else {
            // Build structured message from input fields
            const inputPrompt = this.protocol.buildInputPrompt(message);
            promptMessage = inputPrompt || JSON.stringify(message, null, 2);
        }
        // Add output format instructions
        const enhancedMessage = promptMessage + this.protocol.buildOutputPromptSuffix();
        // Call the provider
        const response = await this.provider.prompt(enhancedMessage);
        if (!response.success) {
            throw new Error(`LLM call failed: ${response.message}`);
        }
        // Parse and return the response
        try {
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
exports.LlmProtocolCommunication = LlmProtocolCommunication;
