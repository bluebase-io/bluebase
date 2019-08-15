import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponse {
    constructor(init?: Partial<LoginResponse>) {
        Object.assign(this, init);
    }

    @ApiModelProperty()
    readonly accessToken: string;

    @ApiModelProperty()
    readonly expiresIn: number;
}
