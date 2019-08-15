import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginRequest } from './dtos/login-request.dto';
import { LoginResponse } from './dtos/login-response.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    @Post()
    async register(@Body() createUserDto: CreateUserDto) {
        await this.usersService.register(createUserDto);
    }

    @Post('/token')
    async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
        return this.usersService.login(loginRequest);
    }
}
