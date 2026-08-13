// openai.service.ts
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class ApiService {
  private client: OpenAI;
  private googleClient: GoogleGenAI;
  private readonly googleMaxOutputTokens = Number(process.env.GOOGLE_MAX_OUTPUT_TOKENS ?? 512);

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const googleApiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENAI_API_KEY;
    if (!googleApiKey) {
      throw new Error('GEMINI_API_KEY or GOOGLE_GENAI_API_KEY is not set');
    }
    this.googleClient = new GoogleGenAI({
      apiKey: googleApiKey,
      httpOptions: {
        timeout: Number(process.env.GOOGLE_REQUEST_TIMEOUT_MS ?? 30000),
      },
    });
  }

  async openaiChat(message: string) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    });
    return response.choices[0].message.content;
  }

  async googleChat(message: string) {
    try {
      const response = await this.googleClient.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: message,
        config: {
          maxOutputTokens: this.googleMaxOutputTokens,
        },
      });
      return response.text;
    } catch (error) {
      if (error instanceof Error && /timeout|aborted|abort/i.test(error.message)) {
        throw new RequestTimeoutException('Google request timed out');
      }

      throw error;
    }
  }
}