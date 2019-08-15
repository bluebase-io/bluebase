import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { ConfigModule } from './../config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from './../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
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
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
