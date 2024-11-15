import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search.module';
import { Search2Module } from './search2/search2.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SearchModule, Search2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
