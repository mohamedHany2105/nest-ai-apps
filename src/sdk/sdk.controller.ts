import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { SdkService } from './sdk.service';
@Controller('sdk')
export class SdkController {
  constructor(private readonly SdkService: SdkService) {}

  @Post('chat')
  async chat(@Body('message') message: string) {

    return  this.SdkService.chat(message);
  }

}
