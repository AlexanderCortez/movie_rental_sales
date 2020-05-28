import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from '@config/database';
import { MovieModule } from '@movie-module/movie.module';
import { AppModule } from '@app-module/app.module';
import { UserModule } from '@user-module/user.module';
import { RoleModule } from '@role-module/role.module';
import { SaleModule } from '@sale-module/sale.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig()),
    MovieModule,
    AppModule,
    UserModule,
    RoleModule,
    SaleModule
  ],
  controllers: [],
})
export class MainModule {}
