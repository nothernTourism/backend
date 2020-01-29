import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AudioSchema } from './audio.schema/audio.schema';
import {MulterModule} from '@nestjs/platform-express';
import { path } from 'src/config/url';


@Module({
  imports: [MongooseModule.forFeature([{name:'Audio', schema:AudioSchema}]),MulterModule.register({
    dest: path,
  })],
  controllers: [AudioController],
  providers: [AudioService]
})
export class AudioModule {}
