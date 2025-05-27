import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
   TypeOrmModule.forRoot({
  type: 'mysql', // ✅ change "postgres" en "mysql"
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'basededonnées',
  entities: [User],
  synchronize: true,
}),
  ],
})
export class DatabaseModule {}
