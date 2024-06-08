import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IUserService } from 'src/modules/user/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import { Utils } from 'src/utils/utils';
import { IAuthService } from './auth.interface';
import { SigninResponse } from './dtos/signin-response.dto';
import { CreateUserInput } from './dtos/createuser.dto';
import { TokenValidationResponse } from './dtos/token-validation.dto';
import { CreateUserResponse } from './dtos/createuser-reponse.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject('UserService') private readonly userService: IUserService) {}

  // Validate the token. In a typical application, the details on the decoded payload will be verified
  // as the db to make sure the user exist
  async validateToken(authToken: string): Promise<TokenValidationResponse> {
    try {
      if (authToken.split(' ')[0] !== 'Bearer') {
        throw new HttpException(
          'Invalid token. Please provide a valid bearer token.',
          HttpStatus.UNAUTHORIZED
        );
      }
      const token = authToken.split(' ')[1];
      // In a real application, the secret will be stored in an env file and not exposed like this.
      // To keep it simple for the purpose of this exercise, I used "secret" as my secret.
      const decoded = Utils.verifyJWTToken(token, 'secret');

      return decoded;
      // The data on the 'decoded' will be further verified against the database records before access is granted
      // Since its for illustration, I think this is ok
    } catch (err) {
      throw err;
    }
  }

  // Sign a user in and gives back a JWT access token to be provided as a Bearer Authorization header.
  async signin(email: string, password: string): Promise<SigninResponse> {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) throw new HttpException('Incorrect password or email.', 400);

      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...restData } = user;
        const payload = {
          id: user.id,
          name: user.firstName,
          email: user.email
        };

        return {
          status: 'success',
          user: restData,
          token: jwt.sign(payload, 'secret', {
            expiresIn: '1d'
          })
        };
      }
      throw new HttpException('Incorrect password or email.', 400);
    } catch (error) {
      throw error;
    }
  }

  async create(createUserInput: CreateUserInput): Promise<CreateUserResponse> {
    const user = await this.userService.create(createUserInput);
    const { password, ...userdataWithOutPassword } = user;
    return {
      status: 'success',
      user: userdataWithOutPassword
    };
  }
}
