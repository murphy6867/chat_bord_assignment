import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  
  registerUser(CreateUserDto: CreateUserDto) {
    const user = this.userService.findByEmail(CreateUserDto.email);
    if (user) throw new ConflictException('User already exist!');
    return this.userService.create(CreateUserDto);
  }
}
