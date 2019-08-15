import { GatewayKeyModule } from './gateway-key/gateway-key.module';
import { GatewayModule } from './gateway/gateway.module';
import { ManufacturerData } from './advertisement/manufacturer-data.model';
import { ServiceData } from './advertisement/service-data.model';
import { Gateway } from './gateway/gateway.entity';
import { MacAddress } from './gateway/mac-address.entity';
import { GatewayKey } from './gateway-key/gateway-key.entity';
import { Advertisement } from './advertisement/advertisement.entity';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { OAuthLogin } from './users/entities/oauth-login';
import { User } from './users/entities/user.entity';
import { ConfigService } from './config/config.service';
import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';

function DatabaseOrmModule(): DynamicModule {
  const config = new ConfigService(`${process.env.NODE_ENV}.env`);
  return TypeOrmModule.forRoot({
    type: 'postgres',
    entities: [
      User,
      OAuthLogin,
      Advertisement,
      GatewayKey,
      MacAddress,
      Gateway,
      ServiceData,
      ManufacturerData,
    ],
    synchronize: false,
    host: config.getTypeOrmConfigs()['TYPEORM_HOST'],
    username: config.getTypeOrmConfigs()['TYPEORM_USERNAME'],
    password: config.getTypeOrmConfigs()['TYPEORM_PASSWORD'],
    port: config.getTypeOrmConfigs()['TYPEORM_PORT'],
    database: config.getTypeOrmConfigs()['TYPEORM_DATABASE'],
  });
}

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule,
    DatabaseOrmModule(),
    AdvertisementModule,
    GatewayModule,
    GatewayKeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
