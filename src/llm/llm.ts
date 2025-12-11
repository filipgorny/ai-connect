import "reflect-metadata";
import { Inject } from "@filipgorny/di";
import { LlmProvider } from "@/providers/llm-provider";
import { LlmProtocol } from "@/protocol/llm-protocol";
import { LlmCommunicationChannel } from "@/protocol/llm-communication-channel";
import { Chat } from "@/chat/chat";

export class Llm {
  constructor(@Inject("LlmProvider") private provider: LlmProvider) {}

  createChat(): Chat {
    return new Chat(this.provider);
  }

  createProtocolChannel(protocol: LlmProtocol): LlmCommunicationChannel {
    return new LlmCommunicationChannel(protocol, this.provider);
  }
}
