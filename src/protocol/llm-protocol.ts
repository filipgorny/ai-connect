export interface LlmProtocolField {
  name: string;
  description: string;
}

export class LlmProtocol {
  private fields: LlmProtocolField[] = [];

  defineField(name: string, description: string): this {
    this.fields.push({ name, description });
    return this;
  }

  defineFields(fields: LlmProtocolField[]): this {
    this.fields.push(...fields);
    return this;
  }

  getFields(): LlmProtocolField[] {
    return [...this.fields];
  }

  buildPromptSuffix(): string {
    if (this.fields.length === 0) {
      return "";
    }

    const fieldsDescription = this.fields
      .map((field) => `  - "${field.name}": ${field.description}`)
      .join("\n");

    return `\n\nRESPONSE FORMAT:\nRespond with a JSON object containing these fields:\n${fieldsDescription}\n\nProvide only valid JSON, no additional text.`;
  }
}
