export class ChannelInput {
  private data: Map<string, string> = new Map();

  constructor(plainObject: Record<string, string>) {
    for (const [name, value] of Object.entries(plainObject)) {
      this.data.set(name, value);
    }
  }

  set(name: string, value: string): void {
    this.data.set(name, value);
  }

  get(name: string): string | undefined {
    return this.data.get(name);
  }

  toObject(): Record<string, string> {
    return Object.fromEntries(this.data);
  }
}
