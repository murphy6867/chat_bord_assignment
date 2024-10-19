import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...user } = createUserDto;
      const hashedPassword = await hash(password);
      const newUser = await this.prisma.users.create({
        data: {
          password: hashedPassword,
          ...user,
        },
        select: {
          user_id: true,
          username: true,
          email: true,
        },
      });
      return newUser;
    } catch (error) {
      throw new ConflictException('Email already exists:' + error);
    }
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}
