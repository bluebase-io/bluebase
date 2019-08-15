import { ConfigService } from '../config/config.service';
import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from './strategies/provider.enum';

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService,
        ) {

    }
    @Get('google')
    @UseGuards(AuthGuard(Provider.GOOGLE))
    async googleLogin() {
        // initiate google oauth2 flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard(Provider.GOOGLE))
    async googleLoginCallback(@Req() req, @Res() res) {
        const jwt: string = req.user.jwt;
        if (jwt) {
            res.redirect(this.configService.getRedirectUrl() + '/login-success/' + jwt);
        } else {
            res.redirect(this.configService.getRedirectUrl() + '/login/failure');
        }
    }
}
