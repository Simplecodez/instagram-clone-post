import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLExceptionFilter } from './filters/graphqlexception.filter';
import { QueryFailedExceptionFilter } from './filters/queryfailedexception.filter';
import { JsonWebTokenExceptionFilter } from './filters/jwtexception.filter';
import { HttpExceptionFilter } from './filters/httpexception.filter';
import { Seed } from './seed-data/loadupdata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GraphQLExceptionFilter());
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new JsonWebTokenExceptionFilter());
  const seed = app.get(Seed);
  seed.saveUsersFromFile();
  await app.listen(3000);
}
bootstrap();
