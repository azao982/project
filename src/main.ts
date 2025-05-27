import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './guards/roles.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

  // Configuration pour servir les fichiers statiques (ex : upload d'images)
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  await app.listen(3000);
}
bootstrap();
