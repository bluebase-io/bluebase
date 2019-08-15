import { GetGatewayKeyDto } from './dtos/get-gateway-key.dto';
import { CreateGatewayKeyDto } from './dtos/create-gateway-key.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Controller,
  Param,
  Header,
  Req, UseGuards
} from "@nestjs/common";
import { GatewayKeyService } from "./gateway-key.service";
import { GatewayKey } from "./gateway-key.entity";

@Controller("gateway-key")
export class GatewayKeyController {
  constructor(private readonly gatewayKeyService: GatewayKeyService) {}
  @ApiCreatedResponse({ type: GatewayKey, description: 'The record has been successfully created.'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())

  @Post()
  async logGateway(@Param() params: any, @Req() req, @Body() body: CreateGatewayKeyDto) {
    if (body && body.key) {
      const ad = this.gatewayKeyService.parseGatewayKeyFromRequestBody(
        body, req.user
      );
      this.gatewayKeyService.createGatewayKey(ad);
    }
    
  }

  @ApiCreatedResponse({ type: GatewayKey, description: 'The record has been received.'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())

  @Get()
  async getGatewayKeys(@Param() params: any, @Req() req) {
    return this.gatewayKeyService.findByUser(req.user);
    
  }
}
