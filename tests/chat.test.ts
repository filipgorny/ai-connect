import { Chat } from "@/chat/chat";
import { MockProvider } from "@/providers/mock-provider";

describe("Chat", () => {
  let chat: Chat;
  let mockProvider: MockProvider;

  beforeEach(() => {
    mockProvider = new MockProvider();
    mockProvider.addResponse({ raw: "Hello from mock" } as any);
    chat = new Chat(mockProvider);
  });

  it("should send a message and return ChatResponse", async () => {
    const response = await chat.message("Hello");
    expect(response.raw).toBe("Hello from mock");
    expect(response.message).toBe("Hello from mock");
    expect(response.toString()).toBe("Hello from mock");
  });
});
