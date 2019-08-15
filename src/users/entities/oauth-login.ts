import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class OAuthLogin {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;
}
