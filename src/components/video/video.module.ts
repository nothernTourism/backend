import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import { path } from 'src/config/url';
import { VideoSchema } from './video.schema/video.schema';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';


@Module({
  imports: [MongooseModule.forFeature([{name:'Video', schema:VideoSchema}]),MulterModule.register({
    dest: path,
  })],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
