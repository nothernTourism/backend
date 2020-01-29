import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Audio} from './audio.interface/audio.interface';

@Injectable()
export class AudioService {
    constructor(
        @InjectModel("Audio") private readonly audioModel: Model<Audio>
      ) {}
    
      async findAll(): Promise<Audio[]> {
        return await this.audioModel.find();
      }
    
      async findOne(id: string): Promise<Audio> {
        return await this.audioModel.findOne({_id:id});
      }
    
      async create(audio: Audio): Promise<Audio> {
        const newAudio = new this.audioModel(audio);
        return await newAudio.save();
      }
}
