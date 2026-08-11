import { Injectable } from '@nestjs/common';
import { OpenRouter } from '@openrouter/sdk';

type OpenRouterClient = {
  chat: {
    send: (request: {
      chatRequest: {
        model: string;
        messages: Array<{ role: string; content: string }>;
        stream: boolean;
      };
    }) => Promise<AsyncIterable<unknown>>;
  };
};

type OpenRouterConstructor = new (options: {
  apiKey: string;
}) => OpenRouterClient;

@Injectable()
export class AiService {
  private readonly openrouter: OpenRouterClient;

  constructor() {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not set');
    }

    const OpenRouterCtor = OpenRouter as unknown as OpenRouterConstructor;

    this.openrouter = new OpenRouterCtor({
      apiKey,
    });
  }

  async chat(message: string): Promise<string> {
    const stream = await this.openrouter.chat.send({
      chatRequest: {
        model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        stream: true,
      },
    });

    let response = '';

    for await (const chunk of stream as AsyncIterable<{
      choices?: Array<{ delta?: { content?: string } }>;
    }>) {
      const content = chunk.choices?.[0]?.delta?.content;

      if (typeof content === 'string') {
        response += content;
      }
    }

    return response;
  }
}
