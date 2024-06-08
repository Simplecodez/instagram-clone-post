import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/user.entity';

@ObjectType()
export class SigninResponse {
  @Field()
  status: string;

  @Field(() => User)
  user: Partial<User>;

  @Field()
  token: string;
}
