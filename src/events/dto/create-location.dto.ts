import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationEventDto {
  @ApiProperty({
    example: 'Brasil',
  })
  @IsNotEmpty()
  @IsString()
  locationName: string;

  @ApiProperty({
    example: -29.584227,
  })
  @IsNumber()
  @IsNotEmpty()
  latitude: string;

  @ApiProperty({
    example: -51.091068,
  })
  @IsNumber()
  @IsNotEmpty()
  longitude: string;

  createdAt: Date = new Date();
}
