import { UserService } from 'src/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { PostService } from 'src/modules/post/services/post.service';
import { userSeeds } from './users';
import { postsSeeds } from './posts';

@Injectable()
export class Seed {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
    @Inject('PostService') private readonly postService: PostService
  ) {}

  async saveUsersFromFile() {
    try {
      // Seed the users first, comment out the user seeding, and seed posts to prevent db duplicate errors.
     // After seeding, they should be commented out to prevent db errors
       await Promise.all(userSeeds.map((user) => this.userService.create(user)));
      // This can be uncommented to add post for each of the users.
      //  await Promise.all(
      //   postsSeeds.map((post, i) => {
      //     console.log(i);
      //     return this.postService.create(post as any, i + 1);
      //   })
      // );
      console.log('Users saved successfully.');
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }
}
