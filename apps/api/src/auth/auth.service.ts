import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(CreateUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(CreateUserDto.email);

    if (user !== null) {
      throw new ConflictException('User already exist!');
    } else {
      return this.userService.create(CreateUserDto);
    }
  }
}
