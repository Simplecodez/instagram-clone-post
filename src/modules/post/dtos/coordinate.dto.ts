import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
// Defines the shape of the coordinate used in location definitions.
export class CoordinateInput {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}
