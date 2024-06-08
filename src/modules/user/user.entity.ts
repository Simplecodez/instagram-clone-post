import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../post/entities/post.entity';
import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

// This is used by typeorm to define the columns of the database entities.
// So as soon the application connect to the database, it create the entity or table on the database with the columns
@Entity()
// @ObjectType() Helps defined graphql object type which is created inthe schema.gql file automatically,
// since we are using the "Code first approach" to defined the schema.
@ObjectType()
export class User {
  //Defines the column as the primary column that will be generated automatically as the rows are inserted
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: false })
  @Field()
  isDeleted: boolean;

  // "@CreateDateColumn" create a column that is populated with the current time when the user is created.
  @CreateDateColumn({ select: false })
  @Field()
  createdAt: Date;

  // Tell the db the relationship between the User and Post entities.
  // "@OneToMany" means that user can have more than one post. So a user can be associated with multiple posts.
  @OneToMany((type) => Post, (post) => post.userId)
  @Field(() => [Post])
  posts: Post[];

  // Runs for new rows, so it hashes the user password before inserting in the DB
  @BeforeInsert()
  async handpassword() {
    this.password = await bcrypt.hash(this.password, 10); //"bcrypt" is used for password hashing.
  }
}
