import { ApiModelProperty } from '@nestjs/swagger';

export class LoginRequest {
    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly password: string;
}
