import { EddystoneData } from './eddystone.entity';
import { MinewData } from './minew.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServiceData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;
  @Column()
  data: string;

  @Column(type => MinewData)
  minew?: MinewData;

  @Column(type => EddystoneData)
  eddystone?: EddystoneData;

}
