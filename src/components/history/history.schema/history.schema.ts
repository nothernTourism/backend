import * as mongoose from "mongoose";

export const HistorySchema= new mongoose.Schema({
    place:String,
    urlpath:String
});