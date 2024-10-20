import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
}
