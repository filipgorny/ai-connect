import { OutputFieldValue } from "./output-field-value";

export class OutputFieldValueCollection {
  private values: OutputFieldValue[] = [];

  constructor(values: OutputFieldValue[]) {
    this.values = values;
  }

  get(name: string): string | undefined {
    const field = this.values.find((v) => v.name === name);
    return field?.value;
  }

  getAll(): OutputFieldValue[] {
    return [...this.values];
  }
}
