import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EddystoneData {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: true })
  type?: "URL" | "TLM" | "UID" | "EID";
  @Column({ nullable: true })
  temperature?: number;
  @Column({ nullable: true })
  batteryVoltage?: number;
  @Column({ nullable: true })
  batteryVoltageString?: string;
  @Column({ nullable: true })
  instance?: string;
  @Column({ nullable: true })
  uid?: string;
  @Column({ nullable: true })
  namespace?: string;
}
