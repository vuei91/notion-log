import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotionModule } from './notion/notion.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), NotionModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
