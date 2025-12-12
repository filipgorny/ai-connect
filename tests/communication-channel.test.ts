import { LlmCommunicationChannel } from "@/protocol/llm-communication-channel";
import { LlmProtocol } from "@/protocol/llm-protocol";
import { MockProvider } from "@/providers/mock-provider";

describe("LlmCommunicationChannel", () => {
  let channel: LlmCommunicationChannel;
  let protocol: LlmProtocol;
  let mockProvider: MockProvider;

  beforeEach(() => {
    protocol = new LlmProtocol()
      .defineInputField("query", "The query to ask")
      .defineOutputField("name", "The name")
      .defineOutputField("age", "The age");

    mockProvider = new MockProvider();
    mockProvider.addResponse({ raw: '{"name": "John", "age": "30"}' } as any);

    channel = new LlmCommunicationChannel(protocol, mockProvider);
  });

  it("should send plain object and return ProtocolResponse", async () => {
    const response = await channel.send({ query: "Who is John?" });

    expect(response.raw).toBe('{"name": "John", "age": "30"}');
    expect(response.fields.get("name")).toBe("John");
    expect(response.fields.get("age")).toBe("30");
  });

  it("should validate input fields", async () => {
    await expect(channel.send({})).rejects.toThrow(
      "Missing required input field",
    );
  });
});
