import { GqlArgumentsHost } from '@nestjs/graphql';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ForbiddenException
} from '@nestjs/common';

@Catch(JsonWebTokenError, TokenExpiredError, ForbiddenException)
// This filter handles exceptions related to JSON Web Tokens (JWT) and Forbidden access.
export class JsonWebTokenExceptionFilter implements ExceptionFilter {
  catch(
    exception: JsonWebTokenError | TokenExpiredError | ForbiddenException,
    host: ArgumentsHost
  ) {
    // Convert the NestJS arguments host to a GraphQL-specific host
    const gqlHost = GqlArgumentsHost.create(host);

    // Create a custom HTTP exception for Unauthorized access
    let customError = new HttpException('Invalid or expired token.', HttpStatus.UNAUTHORIZED);

    // Send the custom error response
    const response = gqlHost.getContext().res;
    if (response) {
      response.status(customError.getStatus()).json({
        statusCode: customError.getStatus(),
        message: customError.message
      });
    }

    // Return the custom error to indicate that it has been handled
    return customError;
  }
}
