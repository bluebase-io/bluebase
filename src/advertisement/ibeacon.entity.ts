import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class iBeacon {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  uuid: string;
  @Column()
  major: string;
  @Column()
  minor: string;
  @Column()
  txPower: string;
  @Column()
  licenseeName: string;
}
