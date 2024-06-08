import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserResolver,
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
export class UserModule {}
