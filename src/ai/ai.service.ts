import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { OpenRouter } from '@openrouter/sdk';

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

type StreamChunk = {
  choices?: Array<{ delta?: { content?: string } }>;
};

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly openrouter: OpenRouter;
  // private readonly model = 'nvidia/nemotron-3-ultra-550b-a55b:free'
  private readonly model = 'poolside/laguna-s-2.1:free';
  // private readonly model = 'nvidia/nemotron-nano-12b-v2-vl:free';

  constructor() {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not set');
    }

    this.openrouter = new OpenRouter({ apiKey });
  }

  async chat(message: string): Promise<string> {
    if (!message?.trim()) {
      throw new InternalServerErrorException('Message must not be empty');
    }

    const messages: ChatMessage[] = [{ role: 'user', content: message }];

    try {
      const stream = await this.openrouter.chat.send({
        chatRequest: {
          model: this.model,
          messages,
          stream: true,
        },
      });

      const parts: string[] = [];

      for await (const chunk of stream as AsyncIterable<StreamChunk>) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (typeof content === 'string') {
          parts.push(content);
        }
      }

      const response = parts.join('');

      if (!response) {
        this.logger.warn('OpenRouter stream returned no content');
      }

      return response;
    } catch (error) {
      this.logger.error('OpenRouter chat request failed', error as Error);
      throw new InternalServerErrorException('Failed to get AI response');
    }
  }
}