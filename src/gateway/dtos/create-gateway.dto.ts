import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateGatewayDto {

    @ApiModelProperty()
    @IsString()
    readonly gatewayId: string;

    @ApiModelProperty()
    @IsString()
    readonly gatewayType: 'noble' | 'android' | 'ios';

    @ApiModelProperty()
    @IsString()
    readonly mac: string;

    @ApiModelProperty()
    @IsString()
    readonly name: string;

}