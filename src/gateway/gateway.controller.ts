import { GatewayKeyService } from './../gateway-key/gateway-key.service';
import { GatewayKey } from './../gateway-key/gateway-key.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Controller,
  Param,
  Header,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Gateway } from './gateway.entity';
import { CreateGatewayDto } from './dtos/create-gateway.dto';

@Controller('gateway')
export class GatewayController {
  private _gatewayKeys: Map<string, GatewayKey> = new Map<string, GatewayKey>();
  constructor(
    private readonly gatewayService: GatewayService,
    private _gatewayKeyService: GatewayKeyService,
  ) {
    this._gatewayKeyService.updatedKeys$.subscribe(res => {
      this._gatewayKeys = res;
    });
  }
  @ApiCreatedResponse({
    type: Gateway,
    description: 'The record has been successfully created.',
  })
  @ApiBearerAuth()
  @Post()
  async logGateway(
    @Param() params: any,
    @Req() req,
    @Body() body: CreateGatewayDto,
  ) {
    if (this._gatewayKeys.get(req.headers.authorization)) {
      if (body && body.gatewayId) {
        const ad = this.gatewayService.parseGatewayFromRequestBody(body);
        ad.gatewayKey = req.headers.authorization;
        this.gatewayService.createGateway(ad);
      }
    }
  }

  @ApiCreatedResponse({
    type: GatewayKey,
    description: 'The record has been received.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  async getGateways(@Param() params: any, @Req() req) {
    return this.gatewayService.findByUser(req.user);
  }
}
