// openrouter.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class SdkService {
  private client: OpenAI;
  private readonly maxTokens: number;

  constructor() { 
    this.client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        // 'HTTP-Referer': 'https://yourapp.com',
        'X-Title': '  ', 
      },
    });
    this.maxTokens = Number(process.env.OPENROUTER_MAX_TOKENS ?? 1024);
  }

  async chat(message: string, model = 'anthropic/claude-sonnet-4') {
    const response = await this.client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: message }],
      max_tokens: this.maxTokens,
    });
    return response.choices[0].message.content;
  }
}