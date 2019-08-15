import { CreateAdvertisementDto } from './dtos/create-advertisement.dto';
import { ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayKey } from './../gateway-key/gateway-key.entity';
import { Observable } from 'rxjs';
import { GatewayKeyService } from './../gateway-key/gateway-key.service';
import {
  Get,
  Post,
  Body,
  Controller,
  Param,
  Header,
  Req,
} from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { Advertisement } from './advertisement.entity';

@Controller('advertisement')
export class AdvertisementController {
  private _gatewayKeys$: Observable<Map<string, GatewayKey>>;
  private _gatewayKeys: Map<string, GatewayKey> = new Map<string, GatewayKey>();
  constructor(
    private readonly advertisementService: AdvertisementService,
    private _gatewayKeyService: GatewayKeyService,
  ) {
    this._gatewayKeyService.updatedKeys$.subscribe(res => {
      this._gatewayKeys = res;
    });
  }

  @ApiCreatedResponse({
    type: Advertisement,
    description: 'The record has been successfully created.',
  })
  @ApiBearerAuth()
  @Post()
  async logAdvertisement(
    @Param() params: any,
    @Req() req,
    @Body() body: CreateAdvertisementDto,
  ) {
    if (this._gatewayKeys.get(req.headers.authorization)) {
      if (body && body.gatewayId) {
        const ad = this.advertisementService.parseAdvertisementFromRequestBody(
          body,
        );
        this.advertisementService.createAdvertisement(ad);
      }
    }
  }
}
