import { GraphQLError, GraphQLFormattedError } from 'graphql';

export class GraphQLErrorFormat {
  static formatError(error: GraphQLError): GraphQLFormattedError {
    return {
      extensions: {
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
        status: 'fail'
      },
      message: error.message,
      locations: error.locations,
      path: error.path
    };
  }
}
