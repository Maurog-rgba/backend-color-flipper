import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('user/login')
  async loginUser(@Body() dto: LoginDto) {
    return await this.authService.loginUser(dto);
  }

  @Post('user/create')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.authService.createUser(dto);
  }
}
