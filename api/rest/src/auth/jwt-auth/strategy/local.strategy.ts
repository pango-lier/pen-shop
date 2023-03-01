import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JwtAuthService } from '../jwt-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: JwtAuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    const user = await this.authService.validateUser(username, password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    } else return user;
  }
}
