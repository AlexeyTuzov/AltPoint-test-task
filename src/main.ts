import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ValidationPipe from './Clients/Pipes/Validation.pipe';

const main = async () => {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);
}
main();
