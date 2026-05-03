import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TasksService } from './tasks/tasks.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tasksService = app.get(TasksService);

  const sampleTasks = [
    { title: 'یادگیری NestJS', description: 'مطالعه مستندات رسمی' },
    { title: 'پیاده‌سازی API', description: 'نوشتن endpointهای مورد نیاز' },
    { title: 'اتصال به دیتابیس', description: 'راه‌اندازی PostgreSQL با Docker' },
    { title: 'نوشتن مستندات', description: 'تکمیل README و Swagger' },
  ];

  for (const task of sampleTasks) {
    await tasksService.create(task);
    console.log(`Created task: ${task.title}`);
  }

  console.log('Seed completed!');
  await app.close();
}

bootstrap();