import { ApiModelProperty } from '@nestjs/swagger';
import { MinLength, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(6)
    readonly username: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @Matches(
        new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'),
        {
            message: 'password must have a minimum of eight characters, at least one letter and one number:',
        })
    readonly password: string;
}
