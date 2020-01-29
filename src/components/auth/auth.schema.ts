import * as mongoose from "mongoose"

export const AuthSchema=new mongoose.Schema({
    userName:String,
    password:String
});