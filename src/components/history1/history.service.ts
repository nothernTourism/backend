import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {History} from './history.interface/history.interface';

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel("history") private readonly historyModel: Model<History>
      ) {}
    
      async findAll(): Promise<History[]> {
        return await this.historyModel.find();
      }
    
      async findOne(id: string): Promise<History> {
        return await this.historyModel.findOne({_id:id});
      }
    
      async create(History: History): Promise<History> {
        const newHistory = new this.historyModel(History);
        return await newHistory.save();
      }
}
