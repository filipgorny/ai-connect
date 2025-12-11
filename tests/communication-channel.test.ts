import { LlmCommunicationChannel } from "@/protocol/llm-communication-channel";
import { LlmProtocol } from "@/protocol/llm-protocol";
import { ChannelInput } from "@/protocol/channel-input";
import { MockProvider } from "@/providers/mock-provider";

describe("LlmCommunicationChannel", () => {
  let channel: LlmCommunicationChannel;
  let protocol: LlmProtocol;
  let mockProvider: MockProvider;

  beforeEach(() => {
    protocol = new LlmProtocol()
      .defineOutputField("name", "The name")
      .defineOutputField("age", "The age");

    mockProvider = new MockProvider();
    mockProvider.addResponse({ raw: '{"name": "John", "age": "30"}' } as any);

    channel = new LlmCommunicationChannel(protocol, mockProvider);
  });

  it("should send ChannelInput and return ProtocolResponse", async () => {
    const input = new ChannelInput({ query: "Who is John?" });
    const response = await channel.send(input);

    expect(response.raw).toBe('{"name": "John", "age": "30"}');
    expect(response.fields.get("name")).toBe("John");
    expect(response.fields.get("age")).toBe("30");
  });

  it("should validate input fields", async () => {
    const input = new ChannelInput({}); // Missing required fields
    await expect(channel.send(input)).rejects.toThrow(
      "Missing required input field",
    );
  });
});
