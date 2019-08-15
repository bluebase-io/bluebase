import { GatewayKeyService } from './../gateway-key/gateway-key.service';
import { User } from './../users/entities/user.entity';
import { MacAddress } from './mac-address.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MongoEntityManager } from 'typeorm';
import { Gateway } from './gateway.entity';
import * as advlib from 'advlib';
import { getManager, getRepository } from 'typeorm';

@Injectable()
export class GatewayService {
  public manager;

  constructor(
    @InjectRepository(Gateway)
    private readonly gatewayRepository: Repository<Gateway>,
    private _gatewayKeyService: GatewayKeyService,
  ) {

    this.manager = getManager();
  }

  async createProduct(gateway: Gateway): Promise<Gateway> {
    let prom = this.gatewayRepository.save(gateway);
    return prom;
  }

  public parseGatewayFromRequestBody(body: any): Gateway {
    /** Handle request object from noble-based gateway */
    if (body.gatewayType === 'noble') {
      const gateway = new Gateway();
      gateway.gatewayId = body.gatewayId;

      let macAddress = new MacAddress();
      macAddress.macAddress = body.mac;
      gateway.macAddresses = new Array<MacAddress>();
      gateway.macAddresses.push(macAddress);

      if (body.gateway) {
        gateway.name = body.gateway.localName;
      }
      gateway.gatewayType = 'noble';
      return gateway;
    } else if (body.gatewayType === 'ios') {
      const gateway = new Gateway();
      gateway.gatewayId = body.gatewayId;
      if (body.gateway) {
        gateway.name = body.gateway.localName;
      }
      gateway.gatewayType = 'ios';
      return gateway;
    } else if (body.gatewayType === 'android') {
      const gateway = new Gateway();
      gateway.gatewayId = body.gatewayId;
      if (body.gateway) {
        gateway.name = body.gateway.localName;
      }

      let macAddress = new MacAddress();
      macAddress.macAddress = body.mac;
      gateway.macAddresses = new Array<MacAddress>();
      gateway.macAddresses.push(macAddress);

      gateway.gatewayType = 'android';
      return gateway;
    }
    return null;
  }

  async findByUser(user: User): Promise<Gateway[]> {
    // return list of api keys from user
    // return all gateways with matching api keys
    let gateways = new Array<Gateway>();
    const keys = await this._gatewayKeyService.findByUser(user);
    for (let i = 0; i < keys.length; i++) {
      const temp = await this.gatewayRepository.find({ gatewayKey: keys[i].key });
      gateways = gateways.concat(temp);
    }
    return gateways;
  }

  async createGateway(gateway: Gateway): Promise<Gateway> {
    this.manager.save(gateway.macAddresses);
    let prom = this.gatewayRepository.save(gateway);
    return prom;
  }
}
