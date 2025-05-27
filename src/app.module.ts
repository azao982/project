// src/app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
