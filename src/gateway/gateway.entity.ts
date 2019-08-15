import { MacAddress } from './mac-address.entity';
import { Entity, Column, PrimaryGeneratedColumn, TreeChildren } from 'typeorm';

@Entity()
export class Gateway {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column()
  gatewayId: string;

  @Column()
  gatewayKey: string;

  @Column()
  gatewayType: 'noble' | 'ios' | 'android';

  @TreeChildren()
  macAddresses?: MacAddress[];
}
