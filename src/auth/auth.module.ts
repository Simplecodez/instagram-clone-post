import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';

@Module({
  providers: [
    {
      provide: 'UserService',
      useClass: UserService
    },
    {
      provide: 'AuthService',
      useClass: AuthService
    },
    AuthGuard,
    AuthResolver
  ],
  imports: [TypeOrmModule.forFeature([User])]
})
export class AuthModule {}
