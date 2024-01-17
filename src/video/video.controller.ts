import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiGetItemsResponse,
  ApiGetResponse,
  ApiPostResponse,
} from 'src/common/decorator/swagger.decorator';
import { PageResDto } from 'src/common/dto/res.dto';
import { CreateVideoResDto, FindVideoResDto } from './dto/res.dto';
import { CreateVideoReqDto } from './dto/req.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('video')
@ApiExtraModels(PageResDto, FindVideoResDto, CreateVideoResDto)
@Controller('video')
export class VideoController {
  constructor() {}

  @ApiPostResponse(CreateVideoResDto)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  async upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'mp4',
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    @Body()
    { title, video }: CreateVideoReqDto,
  ) {
    return 'created video';
  }

  @ApiGetItemsResponse(FindVideoResDto)
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return 'findAll';
  }

  @ApiGetResponse(FindVideoResDto)
  @ApiBearerAuth()
  @Get(':id')
  async findOne() {
    return 'find video';
  }

  @ApiBearerAuth()
  @Get(':id/download')
  async download() {
    return 'download video';
  }
}
