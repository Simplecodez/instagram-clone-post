import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
// This filter handles HTTP exceptions.
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Convert the NestJS arguments host to a GraphQL-specific host
    const gqlHost = GqlArgumentsHost.create(host);
    // Check if the exception status is not 400, 404 and 401.
    // if the error code neither of the three error code, it generate a custom error
    // This is to mask sensitive server errors from leaking to the client.
    if (
      exception.getStatus() !== 400 &&
      exception.getStatus() !== 404 &&
      exception.getStatus() !== 401
    ) {
      console.log(exception);
      exception = new HttpException(
        'An error occurred. Please check your request and try again.',
        500
      );
    }
    // Send the custom error response
    const response = gqlHost.getContext().res;
    if (response) {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.message
      });
    }

    // Return the exception to indicate that it has been handled
    return exception;
  }
}
