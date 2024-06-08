import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IAuthService } from './auth.interface';

@Injectable()
// Provides protection to the graphql endpoints
// In a proper apply, it will be done using Passport and JWT together with their Nestjs modules
export class AuthGuard implements CanActivate {
  // Injects the AuthService in to the class.
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context).getContext();
      const token = ctx.headers['authorization'];

      if (!token) {
        throw new UnauthorizedException('Authentication token is missing.');
      }
      // Adds the user to the context.
      ctx.user = await this.authService.validateToken(token);
      return true;
    } catch (err) {
      // Throws the errors to be handled by the error filters
      throw err;
    }
  }
}
