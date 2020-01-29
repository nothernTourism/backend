import * as mongoose from "mongoose";

export const AudioSchema= new mongoose.Schema({
    place:String,
    urlpath:String
});