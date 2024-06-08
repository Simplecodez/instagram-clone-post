import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { Audience } from '../enums/post.enum';
import { User } from 'src/modules/user/user.entity';
import { CoordinateInput } from './coordinate.dto';

@InputType()
export class UserInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;
}

@InputType()
// Defines the shape of the input for creating a post.
export class CreatePostInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  caption?: string;

  @Field(() => CoordinateInput, { nullable: true })
  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  location?: CoordinateInput;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  music?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsOptional()
  @IsEnum(Audience)
  audience?: Audience;

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  images: string[];
}
