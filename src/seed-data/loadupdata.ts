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
       await Promise.all([userSeeds.map((user) => this.userService.create(user))]);
      console.log('Users saved successfully.');
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }
}
