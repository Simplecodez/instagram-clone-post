import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(GraphQLError)
// This filter handles GraphQL exceptions.
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: GraphQLError, host: ArgumentsHost) {
    // Convert the NestJS arguments host to a GraphQL-specific host
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    const response = ctx.res;
    const status = exception.originalError || 500;
    // Sends an HTTP response with the status code and error message
    response.status(status).json({
      statusCode: status,
      message: exception.message
    });

    // Return the error after sending the response
    return exception;
  }
}
