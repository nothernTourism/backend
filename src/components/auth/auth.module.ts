import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {  JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './auth.schema';
import { UserRepository } from './user.repository';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Auth', schema:AuthSchema}]),
    JwtModule.register({
      secret:'topSecretAuth123',
      signOptions:{
        expiresIn:3600
      }
    }),
    PassportModule.register({
      defaultStrategy:'jwt'
    })
  ],
  controllers: [AuthController],
  providers: [
    UserRepository,
    AuthService,
    JwtStrategy
  ],
  exports:[
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
