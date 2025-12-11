import { randomUUID } from "crypto";

export class ProviderResponse {
  id: string;
  time: Date;
  raw: string;

  constructor(raw: string) {
    this.id = randomUUID();
    this.time = new Date();
    this.raw = raw;
  }
}
