import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocationEventDto } from './create-location.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({
    example: 'Test',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  userId: string;

  @ApiProperty({
    example: '03/03/2023',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateTime: Date;

  @ApiProperty({})
  @IsNotEmpty()
  location: CreateLocationEventDto;
}
