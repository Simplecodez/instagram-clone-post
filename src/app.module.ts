import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './configs/ormconfig';
import { GraphQLErrorFormat } from './graphql/formatter/graphql-error-format.exception';
import { AuthModule } from './auth/auth.module';
import { SeedDataModule } from './seed-data/seed-data.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      context: ({ req }) => ({ headers: req.headers }),
      formatError: GraphQLErrorFormat.formatError
    }),
    TypeOrmModule.forRoot(config),
    PostModule,
    UserModule,
    AuthModule,
    SeedDataModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
