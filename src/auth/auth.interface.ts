import { CreateUserResponse } from './dtos/createuser-reponse.dto';
import { CreateUserInput } from './dtos/createuser.dto';
import { SigninResponse } from './dtos/signin-response.dto';
import { TokenValidationResponse } from './dtos/token-validation.dto';

// Defines contracts to be implemented by the AuthService, thus creating loosely coupled,
// testable and maintainable codebase.
export interface IAuthService {
  create(createUserInput: CreateUserInput): Promise<CreateUserResponse>;
  signin(email: string, password: string): Promise<SigninResponse>;
  validateToken(authToken: string): Promise<TokenValidationResponse>;
}
