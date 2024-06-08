import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/user.entity';

@ObjectType()
export class CreateUserResponse {
  @Field()
  status: string;

  @Field(() => User)
  user: Partial<User>;
}
