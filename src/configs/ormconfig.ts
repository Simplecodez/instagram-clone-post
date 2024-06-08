import { Post } from '../modules/post/entities/post.entity';
import { User } from 'src/modules/user/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  entities: [User, Post],
  synchronize: true
};

export { config };
