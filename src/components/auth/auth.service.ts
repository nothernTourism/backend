import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private userRepository:UserRepository,
        private jwtService:JwtService
    ){}

   async signUp(authCredentialDto:AuthCredentialDto):Promise<void>{
       return this.userRepository.signUp(authCredentialDto);
   }

   async signIn(authCredentialDto:AuthCredentialDto){
        const userName = await this.userRepository.validatePassword(authCredentialDto);
        if(!userName){
            throw new UnauthorizedException('Invalid Credencials !!')
        }
        const payload:JwtPayload ={ userName }
        const accessToken=await this.jwtService.sign(payload)
        return {accessToken}
   }
}