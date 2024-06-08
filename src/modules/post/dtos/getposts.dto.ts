import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';

@ObjectType()
// Defines the shape of the response for queries associated with getting multiple posts.
export class PostsResponse {
  @Field()
  status: string;

  @Field(() => [Post], { nullable: true })
  posts: Post[];
}
