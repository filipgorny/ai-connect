"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGPTProvider = void 0;
class ChatGPTProvider {
    constructor(apiKey) {
        this.apiUrl = "https://api.openai.com/v1/chat/completions";
        this.apiKey = apiKey;
    }
    async prompt(message) {
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: message }],
                }),
            });
            if (!response.ok) {
                return {
                    success: false,
                    message: `API error: ${response.status} ${response.statusText}`,
                };
            }
            const data = await response.json();
            const content = data.choices?.[0]?.message?.content || "";
            return {
                success: true,
                message: content,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
}
exports.ChatGPTProvider = ChatGPTProvider;
