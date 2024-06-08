import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';

@ObjectType()
// // Defines the shape of the response for queries associated with getting a post.
export class PostResponse {
  @Field(() => String)
  status: string;

  @Field(() => Post, { nullable: true })
  post: Post;
}
