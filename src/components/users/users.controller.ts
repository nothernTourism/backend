import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto/user.dto';
import { User } from './user.interface/user.interface';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Get()
    findAll():Promise<User[]>{
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id):Promise<User>{
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() userDto:UserDto):Promise<User>{
        return this.usersService.create(userDto);
    }

    @Delete(':id')
    delete(@Param('id') id):Promise<User>{
        return this.usersService.delete(id)
    }

    @Put(':id')
    update(@Body() userDto:UserDto, @Param('id') id):Promise<User>{
        return this.usersService.update(id,userDto)
    }
}
