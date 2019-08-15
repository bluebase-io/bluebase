import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MinewData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;
  @Column({ nullable: true })
  batteryPercentage?: number;
  @Column({ nullable: true })
  macAddress?: string;
  @Column({ nullable: true })
  temperature?: number;
  @Column({ nullable: true })
  humidity?: number;
  @Column({ nullable: true })
  lumens?: number;
  x?: number;
  @Column({ nullable: true })
  y?: number;
  @Column({ nullable: true })
  z?: number;
}
