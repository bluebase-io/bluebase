import { ConfigService } from './../config/config.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayKeyService } from './gateway-key.service';
import { GatewayKeyController } from './gateway-key.controller';
import { GatewayKey } from './gateway-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GatewayKey]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.getJwtSecret(),
        signOptions: {
            expiresIn: configService.getExpiresIn(),
        },
    }),
    inject: [ConfigService],
  }),
],
  providers: [GatewayKeyService],
  controllers: [
    GatewayKeyController,
  ],
})
export class GatewayKeyModule {}
