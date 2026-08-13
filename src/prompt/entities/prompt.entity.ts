import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AiGenerationStatus } from '../enums';

@Entity({ name: 'ai_generations' })
export class AiGeneration {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, default: 'prompt' })
  module!: string;

  @Column({ name: 'subject_type', type: 'varchar', length: 50, default: 'prompt' })
  subjectType!: string;

  @Column({ name: 'subject_id', type: 'uuid', nullable: true })
  subjectId?: string | null;

  @Column({ name: 'requested_by', type: 'uuid', nullable: true })
  requestedBy?: string | null;

  @Column({ name: 'input_payload', type: 'jsonb', default: () => `'{}'::jsonb` })
  inputPayload!: Record<string, unknown>;

  @Column({ name: 'draft_output', type: 'text', nullable: true })
  draftOutput?: string | null;

  @Column({ name: 'final_output', type: 'text', nullable: true })
  finalOutput?: string | null;

  @Column({ type: 'varchar', length: 20, default: AiGenerationStatus.Queued })
  status!: AiGenerationStatus;

  @Column({ name: 'reviewed_by', type: 'uuid', nullable: true })
  reviewedBy?: string | null;

  @Column({ name: 'reviewed_at', type: 'timestamptz', nullable: true })
  reviewedAt?: Date | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  model?: string | null;

  @Column({ name: 'prompt_version', type: 'varchar', length: 50, nullable: true })
  promptVersion?: string | null;

  @Column({ name: 'input_tokens', type: 'int', nullable: true })
  inputTokens?: number | null;

  @Column({ name: 'output_tokens', type: 'int', nullable: true })
  outputTokens?: number | null;

  @Column({ name: 'cost_usd', type: 'numeric', precision: 8, scale: 5, nullable: true })
  costUsd?: string | null;

  @Column({ type: 'text', nullable: true })
  error?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

