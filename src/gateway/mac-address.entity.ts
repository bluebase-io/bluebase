import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MacAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  macAddress: string;

}
