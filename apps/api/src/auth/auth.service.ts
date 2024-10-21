import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'argon2';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async registerUser(CreateUserDto: CreateUserDto) {
    const user = await this.userService.findByUsername(CreateUserDto.username);
    if (user) {
      throw new ConflictException('User already exist!');
    }

    return this.userService.create(CreateUserDto);
  }

  async validateLocalUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const isPasswordMatched = await verify(user.password, password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    return { id: user.id, username: user.username, email: user.email };
  }

  async login(userId: number, username?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    return {
      id: userId,
      username: username,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found.');

    const currentUser = { id: user.id };
    return currentUser;
  }

  async validateRefreshToken(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found.');

    const currentUser = { id: user.id };
    return currentUser;
  }

  async refreshToken(userId: number, username: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    return {
      id: userId,
      username: username,
      accessToken,
      refreshToken,
    };
  }
}
