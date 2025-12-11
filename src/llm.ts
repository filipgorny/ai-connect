import "reflect-metadata";
import { Inject } from "@filipgorny/di";
import { LlmProvider, ProviderResponse } from "./providers/llm-provider";
import { LlmProtocol } from "./protocol/llm-protocol";
import {
  LlmProtocolCommunication,
  LlmProtocolCommunicationImpl,
} from "./protocol/llm-protocol-communication";

export class Llm {
  constructor(@Inject("LlmProvider") private provider: LlmProvider) {}

  async prompt(message: string): Promise<ProviderResponse> {
    return this.provider.prompt(message);
  }

  defineProtocol(protocol: LlmProtocol): LlmProtocolCommunication {
    return new LlmProtocolCommunicationImpl(protocol, this.prompt.bind(this));
  }
}
