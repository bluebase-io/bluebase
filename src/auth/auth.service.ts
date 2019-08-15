import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../config/config.service';
import { sign } from 'jsonwebtoken';
import { Provider } from './strategies/provider.enum';
import { CreateOAuthUserDto } from '../users/dtos/create-oauth-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateOAuthLogin(profile: any, provider: Provider): Promise<string> {
    try {
      let user = await this.usersService.findOne({
        oAuthLogins: { provider, providerId: profile.id },
      });
      if (!user) {
        user = await this.usersService.registerOAuthUser(
          profile,
          new CreateOAuthUserDto({ provider, providerId: profile.id }),
        );
      }

      const payload = {
        sub: user.id,
      };

      return sign(payload, this.configService.getJwtSecret(), {
        expiresIn: 3600,
      });
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOne({
      _id: ObjectId(payload.sub),
    });
    return user;
  }
}
