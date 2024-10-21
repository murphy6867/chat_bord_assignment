import { Injectable } from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  // create(createPostDto: CreatePostDto) {
  //   return 'This action adds a new post';
  // }

  findAll(categoryId: number, keyword: string) {
    return this.prisma.posts.findMany({
      where: {
        category_id: categoryId,
        title: {
          contains: keyword,
        },
      },
    });
  }

  findAllByUserId(userId: number, categoryId: number, keyword: string) {
    return this.prisma.posts.findMany({
      where: {
        user_id: userId,
        category_id: categoryId,
        title: {
          contains: keyword,
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.posts.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
