import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from './History.schema/History.schema';
import {MulterModule} from '@nestjs/platform-express';
import { path } from 'src/config/url';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';


@Module({
  imports: [MongooseModule.forFeature([{name:'History', schema:HistorySchema}]),MulterModule.register({
    dest: path,
  })],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
