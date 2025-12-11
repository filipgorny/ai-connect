export interface LlmProtocolField {
    name: string;
    description: string;
}
export type InputField = LlmProtocolField;
export type OutputField = LlmProtocolField;
export declare class LlmProtocol {
    private inputFields;
    private outputFields;
    defineInputField(name: string, description: string): this;
    defineInputFields(fields: Record<string, string> | InputField[]): this;
    defineOutputField(name: string, description: string): this;
    defineOutputFields(fields: Record<string, string> | OutputField[]): this;
    defineField(name: string, description: string): this;
    defineFields(fields: LlmProtocolField[]): this;
    getInputFields(): InputField[];
    getOutputFields(): OutputField[];
    buildInputPrompt(data: Record<string, any>): string;
    buildOutputPromptSuffix(): string;
    buildPromptSuffix(): string;
}
