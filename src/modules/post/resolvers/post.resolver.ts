import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { CreatePostInput } from '../dtos/createpost.dto';
import { IPostService } from '../interfaces/post.interface';
import { UpdatePostInput } from '../dtos/update.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/modules/user/user.entity';
import { PostResponse } from '../dtos/getpost.dto';
import { PostsResponse } from '../dtos/getposts.dto';
import { DeletePostsResponse } from '../dtos/deletepost-response.dto';

@Resolver()
@UseGuards(AuthGuard) // Applies AuthGuard to the entire UserResolver, ensuring all queries and mutations are protected
export class PostResolver {
  // Inject the UserService into the resolver
  constructor(@Inject('PostService') private readonly postService: IPostService) {}

  // Define a mutation for creating new post. This return a response with the status of the operation and the created post
  @Mutation((returns) => PostResponse)
  async createPost(
    // @Context provides the user details that was attached to it by the "AuthGuard" on successful authentication.
    @Context('user') user: Partial<User>,
    @Args('CreatePostInput') createPostInput: CreatePostInput
  ) {
    const newPost = await this.postService.create(createPostInput, user.id);
    return { status: 'success', post: newPost };
  }

  // Queries for a post with the provided "id"
  @Query((returns) => PostResponse, { nullable: true })
  async getPostById(@Args('id', { type: () => Int }) id: number) {
    const post = await this.postService.findById(id);
    console.log(post);
    return { status: 'success', post };
  }

  // Queries for all posts.
  @Query(() => PostsResponse, { nullable: true })
  async getAllPosts(): Promise<PostsResponse> {
    const posts = await this.postService.findAll();
    return { status: 'success', posts };
  }

  // Queries for all posts created by the authenticated user
  @Query(() => PostsResponse, { nullable: true })
  async getUserPosts(@Context('user') user: Partial<User>) {
    const posts = await this.postService.findUserPosts(user.id);
    return { status: 'success', posts };
  }

  // Defines a mutation for updating a post.
  @Mutation((returns) => PostResponse, { nullable: true })
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Context('user') user: Partial<User>,
    @Args('UpdatePostInput') updatePostInput: UpdatePostInput
  ) {
    const post = await this.postService.update(id, user.id, updatePostInput);
    return { status: 'success', post };
  }

  // Defines a mutation for "deleting" a post.
  // They post are not actually deleted marked as deleted with the help of the "isDeleted column"
  @Mutation(() => DeletePostsResponse, { nullable: true })
  async deletePost(
    @Args('id', { type: () => Int }) id: number,
    @Context('user') user: Partial<User>
  ) {
    await this.postService.delete(id, user.id);
    return { status: 'deleted' };
  }
}
