import { Injectable, Request } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from '@user-module/user.service';
import { User } from '@entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtOptionalStrategy extends PassportStrategy(Strategy, 'jwt-optional') {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async authenticate(
    @Request() request
  ) {
    try {
      const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      const verification = await this.jwtService
        .verifyAsync(jwtFromRequest, { ignoreExpiration: false });
      const validation = await this.validate(verification);
      this.success(validation); 
    } catch (err) {
      return this.success({});
    }
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findById(payload.sub);
    return user;
  }
}