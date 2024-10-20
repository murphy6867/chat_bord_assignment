/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signup')
  registereUser(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.registerUser(CreateUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req){
    return req.user;
  }
}
