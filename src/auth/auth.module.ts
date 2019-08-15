import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from './../config/config.service';

@Module({
    imports: [
        UsersModule,
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
    providers: [
        AuthService,
        GoogleStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
