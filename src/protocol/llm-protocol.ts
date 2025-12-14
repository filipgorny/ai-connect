import {
  InputField,
  OutputField,
  LlmProtocolField,
} from "./llm-protocol-field";

export class LlmProtocol {
  private inputFields: InputField[] = [];
  private outputFields: OutputField[] = [];

  defineInputField(name: string, description: string): this {
    this.inputFields.push({ name, description });
    return this;
  }

  defineInputFields(fields: Record<string, string> | InputField[]): this {
    if (Array.isArray(fields)) {
      this.inputFields.push(...fields);
    } else {
      for (const [name, description] of Object.entries(fields)) {
        this.inputFields.push({ name, description });
      }
    }
    return this;
  }

  defineOutputField(name: string, description: string): this {
    this.outputFields.push({ name, description });
    return this;
  }

  defineOutputFields(fields: Record<string, string> | OutputField[]): this {
    if (Array.isArray(fields)) {
      this.outputFields.push(...fields);
    } else {
      for (const [name, description] of Object.entries(fields)) {
        this.outputFields.push({ name, description });
      }
    }
    return this;
  }

  getInputFields(): InputField[] {
    return [...this.inputFields];
  }

  getOutputFields(): OutputField[] {
    return [...this.outputFields];
  }

  buildInputPrompt(data: Record<string, any>): string {
    if (this.inputFields.length === 0) {
      return "";
    }

    const lines: string[] = [];
    for (const field of this.inputFields) {
      const value = data[field.name];
      if (value !== undefined) {
        lines.push(`${field.name}: ${value}`);
      }
    }

    return lines.join("\n");
  }

  buildOutputPromptSuffix(): string {
    if (this.outputFields.length === 0) {
      return "";
    }

    const fieldsDescription = this.outputFields
      .map((field) => `  - "${field.name}": ${field.description}`)
      .join("\n");

    return `\n\nRESPONSE FORMAT:\nRespond with a JSON object containing these fields:\n${fieldsDescription}\n\nProvide only valid JSON, no additional text.`;
  }
}
