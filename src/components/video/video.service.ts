import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Video } from './video.interface/video.interface';

@Injectable()
export class VideoService {
    constructor(
        @InjectModel("Video") private readonly videoModel: Model<Video>
      ) {}
    
      async findAll(): Promise<Video[]> {
        return await this.videoModel.find();
      }
    
      async findOne(id: string): Promise<Video> {
        return await this.videoModel.findOne({_id:id});
      }
    
      async create(video: Video): Promise<Video> {
        const newVideo = new this.videoModel(video);
        return await newVideo.save();
      }
}
