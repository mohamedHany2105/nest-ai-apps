import { Controller, Post, Body } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  create(@Body() dto: CreatePromptDto) {
    return this.promptService.createPrompt(dto);
  }
  @Post('1')
  featureOne() {
    return this.promptService.featureone();
  } 
  @Post('2')
  featureTwo() {
    return this.promptService.featureTwo();
  }
  @Post('3')
  featureThree() {
    return this.promptService.featureThree();
  } 
}

