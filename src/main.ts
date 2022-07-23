import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const main = async() => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
main();
