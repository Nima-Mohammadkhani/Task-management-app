import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'عنوان تسک الزامی است' })
  @MinLength(3, { message: 'عنوان حداقل ۳ کاراکتر باید باشد' })
  @MaxLength(100, { message: 'عنوان حداکثر ۱۰۰ کاراکتر می‌تواند باشد' })
  title!: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'توضیحات حداکثر ۵۰۰ کاراکتر می‌تواند باشد' })
  description?: string;
}
