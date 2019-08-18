import { ServiceData } from './service-data.entity';
import { ManufacturerData } from './manufacturer-data.entity';
import { Entity, Column, PrimaryGeneratedColumn, TreeChildren } from 'typeorm';

@Entity()
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column()
  gatewayId: string;

  @Column()
  rssi: number;

  @Column({ nullable: true })
  mac?: string;

  @TreeChildren()
  manufacturerData?: ManufacturerData[];

  @TreeChildren()
  serviceData?: ServiceData[];
}
