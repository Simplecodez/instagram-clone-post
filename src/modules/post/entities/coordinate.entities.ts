import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
// Provide the location column with its shape
export class Coordinate {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}
