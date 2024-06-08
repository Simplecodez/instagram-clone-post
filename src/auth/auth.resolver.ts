import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { SigninResponse } from './dtos/signin-response.dto';

import { IAuthService } from './auth.interface';
import { Inject } from '@nestjs/common';
import { CreateUserInput } from './dtos/createuser.dto';
import { CreateUserResponse } from './dtos/createuser-reponse.dto';

@Resolver() //@Resolver indicates that this is a resolver
export class AuthResolver {
  // Injects the AuthService dependencies into the class
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {}

  // Defines the mutation for signing in.
  @Mutation(() => SigninResponse, { nullable: true })
  async signIn(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.signin(email, password);
  }

  // Defines the mutation for create accounts.
  @Mutation(() => CreateUserResponse, { nullable: true })
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.authService.create(createUserInput);
  }
}
