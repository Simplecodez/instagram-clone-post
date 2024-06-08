import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  ConflictException,
  UnprocessableEntityException,
  NotFoundException,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
// This filter handles errors that occur during database queries.
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError | ApolloError, host: ArgumentsHost) {
    // Convert the NestJS arguments host to a GraphQL-specific host
    const gqlHost = GqlArgumentsHost.create(host);

    // Initialize a variable to hold the custom error
    let error: HttpException;

    // Check the error code to determine the appropriate custom error
    if (exception.driverError.code === '23505') {
      error = new ConflictException('Email already exists.');
    } else if (exception.driverError.code === '23503') {
      error = new UnprocessableEntityException('Invalid payload data.');
    } else if (exception.driverError.code === '22P02') {
      error = new NotFoundException('Cannot find resource.');
    } else {
      console.error(exception);
      error = new HttpException(
        'An error occurred. Please check your request and try again.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    // Send the custom error response
    const response = gqlHost.getContext().res;
    if (response) {
      response.status(error.getStatus()).json({
        statusCode: error.getStatus(),
        message: error.message
      });
    }

    // Return the custom error, indicating it has been handled
    // The error can be logged into a file to help debug and monnitor the server
    return error;
  }
}
