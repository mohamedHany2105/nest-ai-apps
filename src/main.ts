import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config= new DocumentBuilder().setTitle('Router AI API').
  setDescription('Router AI API description').
  setVersion('1.0').addTag('Router AI').
  build(  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  // console.log(process.env.OPENROUTER_API_KEY);
  console.log(`Server is running on http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Server is running on http://localhost:${process.env.PORT ?? 3000}/api`);
}

void bootstrap();
