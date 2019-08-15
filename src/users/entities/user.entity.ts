import { TreeChildren } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { OAuthLogin } from './oauth-login';

@Entity()
export class User {
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Column({nullable: true})
    username: string;

    @ApiModelProperty()
    @Column()
    email: string;

    @ApiModelProperty()
    @Column({nullable: true})
    password: string;

    @ApiModelProperty()
    @TreeChildren()
    oAuthLogins: OAuthLogin[];
}
