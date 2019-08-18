import { iBeaconData } from './ibeacon.model';
import { Entity, Column, PrimaryGeneratedColumn, TreeChildren } from 'typeorm';

@Entity()
export class ManufacturerData {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  companyIdentifierCode?: string;
  @Column()
  companyName?: string;
  @Column()
  data: string;
  @TreeChildren()
  iBeacon?: iBeaconData[];

}
