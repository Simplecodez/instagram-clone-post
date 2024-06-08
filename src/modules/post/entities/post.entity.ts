import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Audience } from '../enums/post.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Coordinate } from './coordinate.entities';
import { User } from 'src/modules/user/user.entity';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  caption?: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  userId: User;

  @Column({ type: 'jsonb', nullable: true })
  @Field(() => Coordinate, { nullable: true })
  location?: Coordinate;

  @Column({ nullable: true })
  @Field({ nullable: true })
  music?: string;

  @Column({ type: 'enum', enum: Audience, default: Audience.PUBLIC })
  @Field(() => Audience, { nullable: true })
  audience?: Audience;

  @Column('simple-array')
  @Field(() => [String])
  images: string[];

  @Column({ default: false })
  @Field()
  isDeleted: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
