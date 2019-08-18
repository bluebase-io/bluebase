import { ManufacturerData } from './manufacturer-data.entity';
import { GatewayKey } from './../gateway-key/gateway-key.entity';
import { GatewayKeyService } from './../gateway-key/gateway-key.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';
import { Advertisement } from './advertisement.entity';
import { ServiceData } from './service-data.entity';
import { EddystoneData } from './eddystone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement, GatewayKey, ServiceData, EddystoneData, ManufacturerData])],
  providers: [AdvertisementService, GatewayKeyService],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}
