import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateGatewayKeyDto {
    @ApiModelProperty()
    @IsString()
    readonly key: string;
}
