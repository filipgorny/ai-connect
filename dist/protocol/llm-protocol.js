"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmProtocol = void 0;
class LlmProtocol {
    constructor() {
        this.inputFields = [];
        this.outputFields = [];
    }
    defineInputField(name, description) {
        this.inputFields.push({ name, description });
        return this;
    }
    defineInputFields(fields) {
        if (Array.isArray(fields)) {
            this.inputFields.push(...fields);
        }
        else {
            for (const [name, description] of Object.entries(fields)) {
                this.inputFields.push({ name, description });
            }
        }
        return this;
    }
    defineOutputField(name, description) {
        this.outputFields.push({ name, description });
        return this;
    }
    defineOutputFields(fields) {
        if (Array.isArray(fields)) {
            this.outputFields.push(...fields);
        }
        else {
            for (const [name, description] of Object.entries(fields)) {
                this.outputFields.push({ name, description });
            }
        }
        return this;
    }
    // Legacy methods for backward compatibility
    defineField(name, description) {
        return this.defineOutputField(name, description);
    }
    defineFields(fields) {
        return this.defineOutputFields(fields);
    }
    getInputFields() {
        return [...this.inputFields];
    }
    getOutputFields() {
        return [...this.outputFields];
    }
    buildInputPrompt(data) {
        if (this.inputFields.length === 0) {
            return "";
        }
        const lines = [];
        for (const field of this.inputFields) {
            const value = data[field.name];
            if (value !== undefined) {
                lines.push(`${field.name}: ${value}`);
            }
        }
        return lines.join("\n");
    }
    buildOutputPromptSuffix() {
        if (this.outputFields.length === 0) {
            return "";
        }
        const fieldsDescription = this.outputFields
            .map((field) => `  - "${field.name}": ${field.description}`)
            .join("\n");
        return `\n\nRESPONSE FORMAT:\nRespond with a JSON object containing these fields:\n${fieldsDescription}\n\nProvide only valid JSON, no additional text.`;
    }
    // Legacy method
    buildPromptSuffix() {
        return this.buildOutputPromptSuffix();
    }
}
exports.LlmProtocol = LlmProtocol;
