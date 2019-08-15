import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from './../config/config.service';
import { GatewayKeyService } from './../gateway-key/gateway-key.service';
import { GatewayKey } from './../gateway-key/gateway-key.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { Gateway } from './gateway.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gateway, GatewayKey]),
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
  providers: [GatewayService, GatewayKeyService],
  controllers: [GatewayController],
})
export class GatewayModule {}
