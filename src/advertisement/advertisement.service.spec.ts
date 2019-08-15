import { User } from './../users/entities/user.entity';
import { ConfigService } from './../config/config.service';
import { DynamicModule } from '@nestjs/common';
import { AdvertisementController } from './advertisement.controller';
import { MinewData } from "./minew.entity";
import { Advertisement } from "./advertisement.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { AdvertisementService } from "./advertisement.service";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { InjectRepository } from "@nestjs/typeorm";


describe("AdvertisementService", () => {
  /** Example noble Peripheral.Advertisement objects for integration testing */
  const nobleAdvertisementObj = {
    gatewayId: "98:3b:8f:6f:e7:02",
    advertisement:
      '{"serviceData":[{"uuid":"ffe1","data":{"type":"Buffer","data":[161,8,100,164,118,37,63,35,172,80,76,85,83,48,51]}}],"serviceUuids":["ffe1"],"solicitationServiceUuids":[],"serviceSolicitationUuids":[]}',
    mac: "ac:23:3f:25:76:a4",
    rssi: -66,
    gatewayType: "noble"
  };

  const nobleAdvertisementEddystoneObj = {
    gatewayId: "98:3b:8f:6f:e7:02",
    advertisement:
      '{"serviceData":[{"uuid":"feaa","data":{"type":"Buffer","data":[16,232,1,109,105,110,101,119,116,101,99,104,0]}}],"serviceUuids":["feaa"],"solicitationServiceUuids":[],"serviceSolicitationUuids":[]}',
    mac: "ac:23:3f:25:76:a4",
    rssi: -62,
    gatewayType: "noble"
  };

  const kontaktioNobleAdvertisement = {
    gatewayId: "98:3b:8f:6f:e7:02",
    advertisement:
      '{"localName":"Kontakt","txPowerLevel":0,"manufacturerData":{"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,17,17,0,1,191]},"serviceData":[{"uuid":"d00d","data":{"type":"Buffer","data":[77,116,49,50,52,49,91]}}],"serviceUuids":[],"solicitationServiceUuids":[],"serviceSolicitationUuids":[]}',
    mac: "e2:02:00:0f:7e:40",
    rssi: -60,
    gatewayType: "noble"
  };

  let service: AdvertisementService;

  beforeEach(async () => {

    function DatabaseOrmModule(): DynamicModule {
      const config = new ConfigService(`${process.env.NODE_ENV}.env`);
      return TypeOrmModule.forRoot({
        type: "mongodb",
        host: config.getTypeOrmConfigs()['TYPEORM_HOST'],
        username: config.getTypeOrmConfigs()['TYPEORM_USERNAME'],
        password: config.getTypeOrmConfigs()['TYPEORM_PASSWORD'],
        // entities: ["src/**/**.entity{.ts,.js}"],
        entities: [
          User, Advertisement,
        ],
        port: config.getTypeOrmConfigs()['TYPEORM_PORT'],
        database: config.getTypeOrmConfigs()['TYPEORM_DATABASE'],
        synchronize: config.getTypeOrmConfigs()['TYPEORM_SYNCHRONIZE'],
      });
    }
    
    function PeripheralDatabaseOrmModule(): DynamicModule {
      const config = new ConfigService(`${process.env.NODE_ENV}.env`);
      return TypeOrmModule.forRoot({
        type: "mongodb",
        host: config.getTypeOrmConfigs()['PERIPHERAL_DB_HOST'],
        username: config.getTypeOrmConfigs()['PERIPHERAL_DB_USERNAME'],
        password: config.getTypeOrmConfigs()['PERIPHERAL_DB_PASSWORD'],
        // entities: ["src/**/**.entity{.ts,.js}"],
        entities: [
          User, Advertisement,
        ],
        port: config.getTypeOrmConfigs()['PERIPHERAL_DB_PORT'],
        database: config.getTypeOrmConfigs()['PERIPHERAL_DB_DATABASE'],
        synchronize: config.getTypeOrmConfigs()['TYPEORM_SYNCHRONIZE'],
      });
    }
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseOrmModule(), TypeOrmModule.forFeature([Advertisement])],
      providers: [AdvertisementService],
      controllers: [AdvertisementController],
    }).compile();

    service = module.get<AdvertisementService>(AdvertisementService);
    // service = new AdvertisementService();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a ServiceData entity with minew info", () => {
    let serv = JSON.parse(nobleAdvertisementObj.advertisement).serviceData[0];
    let entity = service.parseServiceData(
      serv.uuid,
      new Buffer(serv.data.data).toString("hex")
    );
    const passed = entity.minew && entity.data && entity.uuid;
    expect(passed).toBeTruthy();
  });

  it("should return a ManufacturerData entity with iBeacon info", () => {
    let man = new Buffer(JSON.parse(kontaktioNobleAdvertisement.advertisement)
      .manufacturerData).toString('hex');
    let entity = service.parseManufacturerData(man);
    const passed = entity.iBeacon && entity.companyIdentifierCode;
    expect(passed).toBeTruthy();
  });

  it("should return an arbitrary object with a minew property", () => {
    let serv = JSON.parse(nobleAdvertisementObj.advertisement).serviceData[0];
    let entity = service.parseServiceData(
      serv.uuid,
      new Buffer(serv.data.data).toString("hex")
    );
    const passed = entity.minew;
    expect(passed).toBeTruthy();
  });

  it("should return a Minew entity", () => {
    let serv = JSON.parse(nobleAdvertisementObj.advertisement).serviceData[0];
    let entity = service.getMinewEntity(
      service.parseServiceData(
        serv.uuid,
        new Buffer(serv.data.data).toString("hex")
      )
    );
    const passed = entity.name && entity.macAddress;
    expect(passed).toBeTruthy();
  });

  it("should return an Eddystone entity", () => {
    let serv = JSON.parse(nobleAdvertisementEddystoneObj.advertisement)
      .serviceData[0];
    let entity = service.getEddystoneEntity(
      service.parseServiceData(
        serv.uuid,
        new Buffer(serv.data.data).toString("hex")
      )
    );
    const passed = entity.type;
    expect(passed).toBeTruthy();
  });

  it("should return an Advertisement entity with iBeacon and Service data", () => {
    const ad = service.parseAdvertisementFromRequestBody(kontaktioNobleAdvertisement);
    const passed = ad.serviceData && ad.manufacturerData;
    expect(passed).toBeTruthy();
  });
});
