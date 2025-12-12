# @filipgorny/ai-connect

A TypeScript library for connecting to Large Language Models (LLMs) with protocol-based communication and dependency injection support.

## Features

- **Multiple LLM Providers**: Support for OpenAI and extensible provider system
- **Protocol-Based Communication**: Define structured response formats using LlmProtocol
- **Dependency Injection**: Built on @filipgorny/di for flexible architecture
- **Type-Safe**: Full TypeScript support with decorators and metadata
- **Chat Interface**: Simple chat API for conversational interactions
- **Structured Responses**: Parse LLM responses into typed fields

## Installation

```bash
npm install @filipgorny/ai-connect @filipgorny/di reflect-metadata
```

## Quick Start

### Basic Chat (Without Container)

```typescript
import { Llm, OpenAIProvider } from "@filipgorny/ai-connect";

// Create LLM instance directly
const provider = new OpenAIProvider("your-openai-api-key");
const llm = new Llm(provider);

// Create chat and send message
const chat = llm.createChat();
const response = await chat.message("Hello, how are you?");
console.log(response.message); // "I'm doing well, thank you for asking!"
```

### Basic Chat (With Dependency Injection)

```typescript
import "reflect-metadata";
import { Container } from "@filipgorny/di";
import { Llm, OpenAIProvider } from "@filipgorny/ai-connect";

// Setup DI container
const container = new Container();
container.registerInstance(
  "LlmProvider",
  new OpenAIProvider("your-openai-api-key"),
);
container.register("Llm", Llm);

// Get LLM instance
const llm = container.get<Llm>("Llm");

// Create chat and send message
const chat = llm.createChat();
const response = await chat.message("Hello, how are you?");
console.log(response.message); // "I'm doing well, thank you for asking!"
```

### Protocol-Based Communication

```typescript
import { LlmProtocol } from "@filipgorny/ai-connect";

// Define protocol
const protocol = new LlmProtocol()
  .defineInputField("task", "The task description")
  .defineOutputField("priority", "Task priority: low, medium, high")
  .defineOutputField("deadline", "Suggested deadline");

// Create channel
const channel = llm.createProtocolChannel(protocol);

// Send structured input (plain object)
const response = await channel.send({ task: "Review the quarterly report" });

// Access parsed fields
if (response.valid) {
  console.log("Priority:", response.fields.get("priority"));
  console.log("Deadline:", response.fields.get("deadline"));
}
```

## API Reference

### Core Classes

#### `Llm`

Main entry point for LLM operations.

- `createChat(): Chat` - Create a chat instance
- `createProtocolChannel(protocol: LlmProtocol): LlmCommunicationChannel` - Create protocol-based channel

#### `Chat`

Simple conversational interface.

- `message(message: string): Promise<ChatResponse>` - Send message and get response

#### `ChatResponse`

Response from chat interactions.

- `message: string` - The response text
- `toString(): string` - Returns the message

#### `LlmProtocol`

Defines input/output schemas for structured communication.

- `defineInputField(name: string, description: string): this`
- `defineOutputField(name: string, description: string): this`
- `getInputFields(): InputField[]`
- `getOutputFields(): OutputField[]`

#### `ChannelInput`

Input for protocol channels.

- `constructor(plainObject: Record<string, string>)`
- `set(name: string, value: string): void`
- `get(name: string): string | undefined`
- `toObject(): Record<string, string>`

#### `LlmCommunicationChannel`

Handles protocol-based LLM communication.

- `send(message: ChannelInput): Promise<ProtocolResponse>` - Send input and get structured response

#### `ProtocolResponse`

Structured response from protocol channels.

- `valid: boolean` - Whether the response was successfully parsed
- `fields: OutputFieldValueCollection` - Parsed field values
- `isValid(): boolean` - Check if fields are populated

#### `OutputFieldValueCollection`

Collection of parsed field values.

- `get(name: string): string | undefined` - Get field value
- `getAll(): OutputFieldValue[]` - Get all field values

### Providers

#### `OpenAIProvider`

OpenAI GPT integration.

```typescript
const provider = new OpenAIProvider("your-api-key");
```

#### `MockProvider`

Mock provider for testing.

```typescript
const provider = new MockProvider();
provider.addResponse(new ProviderResponse("Mock response"));
```

## Configuration

### TypeScript Setup

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Dependency Injection

The library uses `@filipgorny/di` for dependency injection. Register the `LlmProvider` in your container:

```typescript
const container = new Container();
container.registerInstance("LlmProvider", new OpenAIProvider("api-key"));
container.register("Llm", Llm);
```

## Testing

Run tests:

```bash
npm test
```

Run OpenAI integration test:

```bash
npm run open-ai-test YOUR_API_KEY
```

## Building

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT
