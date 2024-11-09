import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotionModule } from './notion/notion.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), NotionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
