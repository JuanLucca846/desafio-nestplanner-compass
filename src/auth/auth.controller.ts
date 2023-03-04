import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { AuthService } from './auth.service';
import { AuthInterface } from './AuthInterface';
import { LoginUserDto } from './dto/loginAuth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { isPublic } from './public.decorator';

@ApiTags('Users')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @isPublic()
  @Post('/api/v1/users/signIn')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginUserDto: LoginUserDto, @Request() req: AuthInterface) {
    return this.authService.login(req.user);
  }
}
