import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  ApiGetItemsResponse,
  ApiGetResponse,
} from 'src/common/decorator/swagger.decorator';
import { FindUserResDto } from './dto/res.dto';
import { FindUserReqDto } from './dto/req.dto';
import { UserService } from './user.service';
import { PageReqDto } from 'src/common/dto/req.dto';

@ApiTags('user')
@ApiExtraModels(PageReqDto, FindUserReqDto, FindUserResDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiGetItemsResponse(FindUserResDto)
  @ApiBearerAuth()
  @Get()
  async findAll(
    @Query() { page, size }: PageReqDto,
  ): Promise<FindUserResDto[]> {
    const users = await this.userService.findAll(page, size);
    return users.map(({ id, email, createdAt }) => {
      return { id, email, createdAt: createdAt.toISOString() };
    });
  }

  @ApiGetResponse(FindUserResDto)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param() { id }: FindUserReqDto): Promise<FindUserResDto> {
    const { email, createdAt } = await this.userService.findOne(id);
    return { id, email, createdAt: createdAt.toISOString() };
  }
}
