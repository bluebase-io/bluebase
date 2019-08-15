import { User } from './../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class GatewayKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column()
  key: string;

  @Column()
  accepted: boolean;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User
}
