import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellersModule } from './sellers/sellers.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ou postgres, sqlite, etc.
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'votre_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // désactivez en production
    }),
    SellersModule,
    ProductsModule,
  ],
})
export class AppModule {}
