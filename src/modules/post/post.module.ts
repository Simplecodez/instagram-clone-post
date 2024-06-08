import { Module } from '@nestjs/common';
import { PostResolver } from './resolvers/post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostService } from './services/post.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([User])],
  providers: [
    PostResolver,
    {
      provide: 'PostService',
      useClass: PostService
    },
    {
      provide: 'UserService',
      useClass: UserService
    },
    {
      provide: 'AuthService',
      useClass: AuthService
    }
  ]
})
export class PostModule {}
