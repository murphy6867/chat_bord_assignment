import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(
    @Query('keyword') keyword: string,
    @Query('categoryId') categoryId: string,
  ) {
    return this.postsService.findAll(+categoryId, keyword);
  }

  @Get('/users/:userId')
  findAllByUserId(
    // @Query('keyword') keyword: string,
    @Param('userId') userId: string,
    // @Query('categoryId') categoryId: string,
  ) {
    return this.postsService.findAllByUserId(
      +userId,
      //  +categoryId, keyword
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':postId')
  update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(+postId, updatePostDto);
  }

  @Delete(':postId')
  remove(@Param('postId') postId: string) {
    return this.postsService.remove(+postId);
  }
}
