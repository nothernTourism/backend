//use authenticated user and retry
import {PassportStrategy} from '@nestjs/passport';
import {Strategy,ExtractJwt} from  'passport-jwt';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { User } from '../users/user.interface/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userRepository:UserRepository
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'topSecretAuth123'
        })
    }
    async validate(payload:JwtPayload):Promise<User>{
        const {userName} =payload
        const user = await this.userRepository.findOne({userName})

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}