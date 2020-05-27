import { Module } from '@nestjs/common';
import { AppController } from '@app-module/app.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [AppController]
})
export class AppModule { }
