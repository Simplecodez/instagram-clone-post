import { Module } from '@nestjs/common';
import { Seed } from './loadupdata';
import { UserService } from 'src/modules/user/user.service';
import { PostService } from 'src/modules/post/services/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { Post } from 'src/modules/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Post])],
  providers: [
    Seed,
    {
      provide: 'UserService',
      useClass: UserService
    },
    {
      provide: 'PostService',
      useClass: PostService
    }
  ]
})
export class SeedDataModule {}
