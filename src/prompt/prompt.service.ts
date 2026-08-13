import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiService } from '../ai/ai.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { AiGeneration } from './entities/prompt.entity';
import { AiGenerationStatus } from './enums';

@Injectable()
export class PromptService {
  constructor(
    private readonly aiService: AiService,
    @InjectRepository(AiGeneration, 'postgres')
    private readonly promptRepo: Repository<AiGeneration>,
  ) {}

  async createPrompt(dto: CreatePromptDto) {
    // it should get data by progress record and run automatically at the begin of each month
    const generatedText = await this.aiService.chat(dto.message);

    const record = this.promptRepo.create({
      module: 'prompt',
      subjectType: 'message',
      subjectId: dto.subjectId ?? null,
      requestedBy: dto.requestedBy ?? null,
      inputPayload: {
        message: dto.message,
        ...(dto.metadata ?? {}),
      },
      draftOutput: generatedText,
      finalOutput: generatedText,
      status: AiGenerationStatus.Generated,
      model: dto.model ?? 'openrouter',
      promptVersion: dto.promptVersion ?? 'v1',
      inputTokens: null,
      outputTokens: null,
      costUsd: null,
      error: null,
    });

    return this.promptRepo.save(record);
  }
}
