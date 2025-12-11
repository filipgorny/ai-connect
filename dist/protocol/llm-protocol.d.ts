export interface LlmProtocolField {
    name: string;
    description: string;
}
export declare class LlmProtocol {
    private fields;
    defineField(name: string, description: string): this;
    defineFields(fields: LlmProtocolField[]): this;
    getFields(): LlmProtocolField[];
    buildPromptSuffix(): string;
}
