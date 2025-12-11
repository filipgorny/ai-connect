import { ProviderResponse } from "../providers/provider-response";
import { OutputFieldValue } from "./output-field-value";
import { OutputFieldValueCollection } from "./output-field-value-collection";

export class ProtocolResponse extends ProviderResponse {
  fields: OutputFieldValueCollection;

  constructor(raw: string, fields: OutputFieldValue[]) {
    super(raw);
    this.fields = new OutputFieldValueCollection(fields);
  }

  isValid(): boolean {
    return this.fields.getAll().length > 0;
  }

  get valid(): boolean {
    return this.isValid();
  }
}
