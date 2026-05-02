import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @ApiProperty({
    description: 'Task unique ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Learn NestJS',
    minLength: 3,
    maxLength: 100,
  })
  @Column({ length: 100 })
  title!: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Read NestJS documentation',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description!: string;

  @ApiProperty({
    description: 'Task completion status',
    example: false,
    default: false,
  })
  @Column({ default: false })
  isDone!: boolean;

  @ApiProperty({
    description: 'Task creation date',
    example: '2026-05-02T15:30:00.000Z',
  })
  @CreateDateColumn()
  createdAt!: Date;
}
