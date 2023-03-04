import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindEventsQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  offset: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  limit: string;

  constructor(limit = '10', offset = '0') {
    this.limit = limit;
    this.offset = offset;
  }
}
