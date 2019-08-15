import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { GatewayKey } from './gateway-key.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MongoEntityManager } from 'typeorm';
import * as advlib from 'advlib';
import { getManager, getRepository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GatewayKeyService {
  public manager;
  public updatedKeys$: BehaviorSubject<
    Map<string, GatewayKey>
  > = new BehaviorSubject(new Map<string, GatewayKey>());
  constructor(
    @InjectRepository(GatewayKey)
    private readonly gatewayKeyRepository: Repository<GatewayKey>,
  ) {
    this.manager = getManager();
    this.getGatewayKeys().subscribe(res => {
      this.updatedKeys$.next(res);
    });
  }

  async createProduct(gatewayKey: GatewayKey): Promise<GatewayKey> {
    let prom = this.gatewayKeyRepository.save(gatewayKey);
    return prom;
  }

  public getGatewayKeys(): Observable<Map<string, GatewayKey>> {
    return from(this.gatewayKeyRepository.find()).pipe(
      map((keys: Array<GatewayKey>) => {
        let map = new Map<string, GatewayKey>();
        for (let i = 0; i < keys.length; i++) {
          if (keys[i].accepted) {
            map.set(keys[i].key, keys[i]);
          }
        }
        return map;
      }),
    );
  }

  public parseGatewayKeyFromRequestBody(body: any, user: User): GatewayKey {
    /** Handle request object from noble-based gateway */
    if (body.key) {
      const key = new GatewayKey();
      key.key = body.key;
      key.user = user;
      key.accepted = true;
      return key;
    }
    return null;
  }

  async findByUser(user: User): Promise<GatewayKey[]> {
    return await this.gatewayKeyRepository.find({ user: user });
  }

  async createGatewayKey(gatewayKey: GatewayKey): Promise<GatewayKey> {
    let prom = this.gatewayKeyRepository.save(gatewayKey);
    this.getGatewayKeys().subscribe(res => {
      this.updatedKeys$.next(res);
    });
    return prom;
  }
}
