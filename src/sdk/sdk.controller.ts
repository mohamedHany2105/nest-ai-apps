import { Controller, Post } from '@nestjs/common';

@Controller('sdk')
export class SdkController {

  @Post('chat')
  async chat(@Body('message') message: string) {
    return this.sdkService.chat(message);
  }

}
