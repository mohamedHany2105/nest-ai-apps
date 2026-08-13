import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiModule } from './ai/ai.module';
import { SdkService } from './sdk/sdk.service';
import { SdkController } from './sdk/sdk.controller';
import { SdkModule } from './sdk/sdk.module';
import { ApiModule } from './api/api.module';
import { PromptModule } from './prompt/prompt.module';
import { AiGeneration } from './prompt/entities/prompt.entity';
import { AiService } from './ai/ai.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      name: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT ?? 5432),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [AiGeneration],
      synchronize: true,
      logging: true,
    }),
    AiModule,
    SdkModule,
    ApiModule,
    PromptModule,
  ],
  controllers: [SdkController],
  providers: [SdkService,AiService],
})
export class AppModule {}