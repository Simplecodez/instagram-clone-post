import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { Audience } from '../enums/post.enum';
import { User } from 'src/modules/user/user.entity';
import { CoordinateInput } from './coordinate.dto';

@InputType()
// Defines the input type for updating a post.
export class UpdatePostInput {
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
  @IsOptional()
  @IsEnum(Audience)
  audience?: Audience;
}
