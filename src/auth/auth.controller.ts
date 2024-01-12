import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/public.decorator';
import { SigninResDto, SignupResDto } from './dto/res.dto';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';

@ApiTags('auth')
@ApiExtraModels(SignupResDto, SigninResDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiPostResponse(SignupResDto)
  @ApiBearerAuth()
  @Public()
  @Post('signup')
  async signup(
    @Body() { email, password, passwordConfirm }: SignupReqDto,
  ): Promise<SignupResDto> {
    if (password !== passwordConfirm) {
      throw new BadRequestException('비밀번호를 확인해보십시오');
    }
    const { id, accessToken, refreshToken } = await this.authService.signup(
      email,
      password,
    );
    return { id, accessToken, refreshToken };
  }

  @ApiPostResponse(SigninResDto)
  @ApiBearerAuth()
  @Public()
  @Post('signin')
  async signin(@Body() { email, password }: SigninReqDto) {
    return this.authService.signin(email, password);
  }
}
