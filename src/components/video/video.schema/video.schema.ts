import * as mongoose from "mongoose";

export const VideoSchema= new mongoose.Schema({
    place:String,
    urlpath:String
});