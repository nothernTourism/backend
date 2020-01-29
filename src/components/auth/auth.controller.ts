import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './auth-credential.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from './get-user-decorator';
// import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<void>{
        return await this.authService.signUp(authCredentialDto);
    }
    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto){
        return await this.authService.signIn(authCredentialDto)
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user:User ){
    //     console.log(user)
    //     // return user;
    // }
}