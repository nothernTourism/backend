import { AuthCredentialDto } from "./auth-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Auth } from "./auth-credential.interface";
import { InjectModel } from "@nestjs/mongoose";
import {Model } from 'mongoose'

export class UserRepository {
    constructor(
        @InjectModel('Auth') private readonly userModel: Model <Auth>,
    ){}
    async signUp(authCredencialDto:AuthCredentialDto):Promise<void>{
        const {userName,password} =authCredencialDto
        const user = new this.userModel();
        user.userName=userName;
        user.salt= await bcrypt.genSalt()
        user.password=await this.hashPassword(password,user.salt);
        try{
            await user.save();
        }catch(e){
            if(e.code==='23505'){
                throw new ConflictException('username already exist!!')
            }else{
                throw new InternalServerErrorException()
            }
        }
    }
    async findOne(obj){
        return await this.userModel.findOne(obj);
    }
    //for signin purpose check the password is same
    async validatePassword(authCredencialDto:AuthCredentialDto):Promise<string>{
        const {userName,password}=authCredencialDto;
        const user =await this.userModel.findOne({userName});
            return user.userName;
    }
    
    private hashPassword(password:string,salt:string):Promise<string>{
        return bcrypt.hash(password,salt);
    }
}
