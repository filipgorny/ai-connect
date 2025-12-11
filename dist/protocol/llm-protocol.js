"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmProtocol = void 0;
class LlmProtocol {
    constructor() {
        this.fields = [];
    }
    defineField(name, description) {
        this.fields.push({ name, description });
        return this;
    }
    defineFields(fields) {
        this.fields.push(...fields);
        return this;
    }
    getFields() {
        return [...this.fields];
    }
    buildPromptSuffix() {
        if (this.fields.length === 0) {
            return "";
        }
        const fieldsDescription = this.fields
            .map((field) => `  - "${field.name}": ${field.description}`)
            .join("\n");
        return `\n\nRESPONSE FORMAT:\nRespond with a JSON object containing these fields:\n${fieldsDescription}\n\nProvide only valid JSON, no additional text.`;
    }
}
exports.LlmProtocol = LlmProtocol;
