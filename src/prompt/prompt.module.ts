import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiModule } from '../ai/ai.module';
import { PromptController } from './prompt.controller';
import { PromptService } from './prompt.service';
import { AiGeneration } from './entities/prompt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiGeneration], 'postgres'), AiModule],
  controllers: [PromptController],
  providers: [PromptService],
})
export class PromptModule {}
