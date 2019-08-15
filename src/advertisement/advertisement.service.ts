import { iBeaconData } from "./ibeacon.model";
import { ManufacturerData } from "./manufacturer-data.entity";
import { EddystoneData } from "./eddystone.entity";
import { ServiceData } from "./service-data.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MongoEntityManager } from "typeorm";
import { Advertisement } from "./advertisement.entity";
import * as advlib from "advlib";
import { MinewData } from "./minew.entity";
import {getManager, getRepository} from "typeorm";

@Injectable()
export class AdvertisementService {
  public manager;

  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRepository: Repository<Advertisement>
  ) {
    /*
      const pr1 = new Product();
      pr1.description = 'First Product';
      pr1.name = 'product1';
      this.productRepository.save(pr1);
      */
     this.manager = getManager();
  }

  async createProduct(advertisement: Advertisement): Promise<Advertisement> {
    let prom = this.advertisementRepository.save(advertisement);
    return prom;
  }

  public parseManufacturerData(manData): any {
    // const switched = advlib.ble.data.gap.solicitation.process(uuid);
    return advlib.ble.data.gap.manufacturerspecificdata.process(manData);
  }

  public parseServiceData(uuid, serviceData): any {
    const switched = advlib.ble.data.gap.solicitation.process(uuid);
    return advlib.ble.data.gap.servicedata.process(switched + serviceData);
  }

  public getMinewEntity(arbMinew: any): MinewData {
    let min = new MinewData();
    min = Object.assign({}, min, arbMinew.minew) as MinewData;
    return min;
  }

  public getEddystoneEntity(arbEddystone: any): EddystoneData {
    let ed = new EddystoneData();
    ed = Object.assign({}, ed, arbEddystone.eddystone) as EddystoneData;
    return ed;
  }

  public getiBeaconEntity(arbiBeacon: any): iBeaconData {
    let ibeacon = new iBeaconData();
    ibeacon = Object.assign({}, ibeacon, arbiBeacon.iBeacon) as iBeaconData;
    return ibeacon;
  }

  public getServiceDataEntity(
    serviceData: any,
    uuid: string,
    data: string
  ): ServiceData {
    let serv = new ServiceData();
    serv.uuid = uuid;
    serv.data = data;
    if (serviceData.eddystone) {
      serv.eddystone = this.getEddystoneEntity(serviceData);
    }

    if (serviceData.minew) {
      serv.minew = this.getMinewEntity(serviceData);
    }
    return serv;
  }

  public getManufacturerDataEntity(manData: any): ManufacturerData {
    let man = new ManufacturerData();
    man.companyName = manData.companyName;
    man.companyIdentifierCode = manData.companyIdentifierCode;
    man.data = manData.data;
    if (manData.iBeacon) {
      man.iBeacon = this.getiBeaconEntity(manData);
    }
    return man;
  }

  public parseAdvertisementFromRequestBody(body: any): Advertisement {
    /** Handle request object from noble-based gateway */
    if (body.gatewayType === "noble") {
      let ad = new Advertisement();
      body.advertisement = JSON.parse(body.advertisement);
      ad.gatewayId = body.gatewayId;
      ad.mac = body.mac;
      ad.rssi = body.rssi;
      ad.name = body.advertisement.localName;
      let serviceDataEntity = [];
      
      for (const serviceData of body.advertisement.serviceData) {
        serviceDataEntity.push(this.getServiceDataEntity(
          this.parseServiceData(
            serviceData.uuid,
            serviceData.data.toString("hex")
          ),
          serviceData.uuid,
          new Buffer(serviceData.data.data).toString("hex")
        ) as ServiceData);
      }
      let manufacturerData = [];
      if (body.advertisement.manufacturerData) {
        manufacturerData.push(this.getManufacturerDataEntity(
          this.parseManufacturerData(
            new Buffer(body.advertisement.manufacturerData).toString("hex")
          )
        ));
      }
      ad.serviceData = serviceDataEntity;
      ad.manufacturerData = manufacturerData;
      this.manager.save(serviceDataEntity);
      this.manager.save(manufacturerData);
      this.manager.save(ad);
      
      return ad;
    }
    return null;
  }

  async createAdvertisement(
    advertisement: Advertisement
  ): Promise<Advertisement> {
    let prom = this.advertisementRepository.save(advertisement);
    return prom;
  }
}
