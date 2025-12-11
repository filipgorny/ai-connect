import { OpenAIProvider } from "@/providers/openai-provider";
import { Chat } from "@/chat/chat";
import { LlmProtocol } from "@/protocol/llm-protocol";
import { LlmCommunicationChannel } from "@/protocol/llm-communication-channel";
import { ChannelInput } from "@/protocol/channel-input";

describe("OpenAI Integration Tests", () => {
  let provider: OpenAIProvider;
  let chat: Chat;
  let protocol: LlmProtocol;
  let channel: LlmCommunicationChannel;

  beforeEach(() => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is required");
    }
    provider = new OpenAIProvider(apiKey);
    chat = new Chat(provider);
    protocol = new LlmProtocol()
      .defineInputField("question", "The question to answer")
      .defineOutputField("answer", "The answer to the question")
      .defineOutputField("confidence", "Confidence level from 0 to 1");
    channel = new LlmCommunicationChannel(protocol, provider);
  });

  it("should prompt directly with OpenAIProvider", async () => {
    const response = await provider.prompt("Say hello");
    expect(response.raw).toBeDefined();
    expect(typeof response.raw).toBe("string");
    expect(response.raw.length).toBeGreaterThan(0);
  }, 30000);

  it("should create and use Chat object", async () => {
    const response = await chat.message("What is 2 + 2?");
    expect(response.raw).toBeDefined();
    expect(response.message).toBe(response.raw);
    expect(typeof response.message).toBe("string");
    expect(response.message.length).toBeGreaterThan(0);
  }, 30000);

  it("should use LlmCommunicationChannel with protocol", async () => {
    const input = new ChannelInput({ question: "What is 2 + 2?" });
    const response = await channel.send(input);
    expect(response.raw).toBeDefined();
    expect(response.fields).toBeDefined();
    expect(response.valid).toBe(true); // Checks if fields are populated
    // Note: Specific field names depend on LLM response, but validity ensures parsing worked
  }, 30000);
});
