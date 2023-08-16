import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './entities/post.entity';

@Resolver('posts')
export class PostsResolver {
  constructor(private readonly postsService: PostService) {}

  @Query(() => [Post])
  async findAllPost() {
    return this.postsService.findAll();
  }

  @Query(() => Post)
  async findOnePost(@Args('id', { type: () => ID }) id: number) {
    return this.postsService.findOne(+id);
  }
  @Mutation(() => Post)
  async createPost(@Args('createPost') createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Mutation(() => Post)
  updatePost(
    @Args('id', { type: () => ID }) id: number,
    @Args('updatePost') updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Mutation(() => Number)
  removePost(@Args('id', { type: () => ID }) id: number) {
    return this.postsService.remove(id);
  }
}
