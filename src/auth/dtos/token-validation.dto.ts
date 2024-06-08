import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/user.entity';

@ObjectType()
export class TokenValidationResponse {
  @Field(() => Int)
  id: string;

  @Field()
  name: User;

  @Field()
  email: string;
}
