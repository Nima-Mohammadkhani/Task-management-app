import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'create task',
  })
  @ApiCreatedResponse({ description: 'Task created successfully', type: Task })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all tasks',
    description: 'Returns list of all tasks',
  })
  @ApiOkResponse({
    description: 'Tasks retrieved successfully',
    type: [Task],
  })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get one task',
    description: 'Get a task by UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({ description: 'Task retrieved successfully', type: Task })
  @ApiNotFoundResponse({ description: 'Task not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update task',
    description: 'Update title, description or status of a task',
  })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({ description: 'Task updated successfully', type: Task })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'delete task',
    description: 'Delete a task by UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiNoContentResponse({ description: 'Task deleted successfully' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
