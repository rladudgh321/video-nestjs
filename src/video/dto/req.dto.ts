import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateVideoReqDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  video: any;
}

export class FindUserReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}
