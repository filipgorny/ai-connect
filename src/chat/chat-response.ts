import { ProviderResponse } from "@/providers/provider-response";

export class ChatResponse extends ProviderResponse {
  get message(): string {
    return this.raw;
  }

  toString(): string {
    return this.message;
  }
}
