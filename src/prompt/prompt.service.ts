import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiService } from '../ai/ai.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { AiGeneration } from './entities/prompt.entity';
import { AiGenerationStatus } from './enums';
import { prompts } from './prompt/prompt.prompt';

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

    // const record = this.promptRepo.create({
    //   module: 'prompt',
    //   subjectType: 'message',
    //   subjectId: dto.subjectId ?? null,
    //   requestedBy: dto.requestedBy ?? null,
    //   inputPayload: {
    //     message: dto.message,
    //     ...(dto.metadata ?? {}),
    //   },
    //   draftOutput: generatedText,
    //   finalOutput: generatedText,
    //   status: AiGenerationStatus.Generated,
    //   model: dto.model ?? 'openrouter',
    //   promptVersion: dto.promptVersion ?? 'v1',
    //   inputTokens: null,
    //   outputTokens: null,
    //   costUsd: null,
    //   error: null,
    // });

    // return this.promptRepo.save(record);

        return generatedText;
  }
  async featureone() {
    // it should get data by progress record and run automatically at the begin of each month

    //
    const generatedText = await this.aiService.chat(prompts.tier1); 
    

    // this option should read from database and it will be implemented on the other features functions


    //     const record = this.promptRepo.create({

    //   module: 'prompt',// should be filled by the db 
    //   subjectType: 'message',// should be filled by the db 
    //   subjectId: dto.subjectId ?? null,
    //   requestedBy: dto.requestedBy ?? null,// should be filled by the db 
    //   inputPayload: { // should be filled by the db 
    //     message: dto.message,
    //     ...(dto.metadata ?? {}),
    //   },
    //   draftOutput: generatedText,// filled by ai
    //   finalOutput: generatedText,// filled by ai
    //   status: AiGenerationStatus.Generated,// filled by ai service module
    //   model: dto.model ?? 'openrouter', // filled by ai service module
    //   promptVersion: dto.promptVersion ?? 'v1',
    //   inputTokens: null,
    //   outputTokens: null,
    //   costUsd: null,
    //   error: null,
    // });

    // return this.promptRepo.save(record);
    return generatedText;
  }
    async featureTwo() {
    // prompt = "translate to arabic | translate to english"
    const generatedText = await this.aiService.chat(prompts.tier2); 
    return generatedText;
  }
    async featureThree() {
   // input = text
   // output = more details about this text
   // cleanded comments 
  // suggested tagweed
    const generatedText = await this.aiService.chat(prompts.tier3); 
    return generatedText;
  }
}
