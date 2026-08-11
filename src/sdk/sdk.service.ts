// openrouter.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenRouterService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://yourapp.com',
        'X-Title': 'YourAppName',
      },
    });
  }

  async chat(message: string, model = 'anthropic/claude-sonnet-4') {
    const response = await this.client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: message }],
    });
    return response.choices[0].message.content;
  }
}