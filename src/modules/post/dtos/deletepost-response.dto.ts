import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
// Defines the shape of the response gotten when as post is deleted.
export class DeletePostsResponse {
  @Field()
  status: string;
}
