import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        user: { connect: { id: createPostDto.userId } },
      },
    });
  }

  findAll(categoryId: number, keyword: string) {
    return this.prisma.post.findMany({
      where: {
        title: {
          contains: keyword,
        },
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
        _count: {
          select: { comments: true },
        },
        user: { select: { id: true, username: true } },
      },
    });
  }

  findAllByUserId(userId: number, categoryId: number, keyword: string) {
    return this.prisma.post.findMany({
      where: {
        userId: userId,
        categoryId: categoryId,
        title: {
          contains: keyword,
        },
      },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: { comments: true },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: { select: { username: true, id: true } },
          },
        },
      },
    });

    if (!post) throw new NotFoundException(`Post not found.`);

    return post;
  }

  update(postId: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: updatePostDto,
    });
  }

  remove(postId: number) {
    return this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
