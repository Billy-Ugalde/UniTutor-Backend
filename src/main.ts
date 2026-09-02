import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { enableFrontendCors } from './cors.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  enableFrontendCors(app);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
