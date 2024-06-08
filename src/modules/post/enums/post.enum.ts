import { registerEnumType } from '@nestjs/graphql';

// Creates an Audience enum to defined the alloed string of the Audience column and fields.
export enum Audience {
  PUBLIC = 'PUBLIC',
  FRIENDS = 'FRIENDS',
  PRIVATE = 'PRIVATE'
}

// Registers the enum to the Graphql registry.
registerEnumType(Audience, {
  name: 'Audience',
  description: 'The audience type for the post'
});
