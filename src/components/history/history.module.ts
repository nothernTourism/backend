import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import { path } from 'src/config/url';
import { HistorySchema } from './history.schema/history.schema';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';


@Module({
  imports: [MongooseModule.forFeature([{name:'History', schema:HistorySchema}]),MulterModule.register({
    dest: path,
  })],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
