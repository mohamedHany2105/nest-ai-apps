import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { SdkService } from './sdk/sdk.service';
import { SdkController } from './sdk/sdk.controller';
import { SdkModule } from './sdk/sdk.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AiModule,
    SdkModule,
    // ApiModule,
  ],
  controllers: [SdkController, SdkController],
  providers: [SdkService],
})
export class AppModule {}