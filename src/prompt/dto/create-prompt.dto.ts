import { IsNotEmpty, IsOptional, IsString, IsUUID, IsObject } from 'class-validator';

export class CreatePromptDto {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsOptional()
  @IsUUID()
  subjectId?: string | null;

  @IsOptional()
  @IsUUID()
  requestedBy?: string | null;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  promptVersion?: string;
}

