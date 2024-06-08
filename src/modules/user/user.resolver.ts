import { Args, Context, Field, Int, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/modules/user/user.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { IUserService } from './interfaces/user.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver()
@UseGuards(AuthGuard) // Applies AuthGuard to the entire UserResolver, ensuring all queries and mutations are protected
export class UserResolver {
  // Inject the UserService into the resolver
  constructor(@Inject('UserService') private readonly userService: IUserService) {}

  // Define a query to get the current logged-in user
  @Query((returns) => User, { nullable: true })
  async getMe(@Context('user') user: Partial<User>) {
    // Return the user by their ID from the user service
    return await this.userService.findById(user.id);
  }

  // Define a query to get all users, usually for the administrative purposes or auditing.
  // The passwords are not retrieved
  @Query(() => [User], { nullable: true })
  async getAllUsers() {
    return this.userService.findAll();
  }

  // Defines a mutation to delete a user by ID.
  // User accounts are not deleted, their "isDelete" field is just changed from false to true.
  // This aids auditing and maintains consistency in the entity.
  @Mutation(() => User, { nullable: true })
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.delete(id);
  }
}
