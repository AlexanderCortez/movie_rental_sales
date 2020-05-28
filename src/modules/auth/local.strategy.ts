import { Strategy } from 'passport-strategy';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@auth-module/auth.service';
import { AuthBodyDTO } from '@auth-module/dto/auth-body.dto';
import { User } from '@entities/user.entity';
import { plainToClass } from 'class-transformer';
import { AuthUserDTO } from '@auth-module/dto/auth-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService
  ) {
    super();
  }

  async authenticate({ body }) {
    const params: AuthBodyDTO = body;
    try {
      const result = await this.validate(params.email, params.password);
      this.success(result);
    } catch (err) {
      this.fail(err);
    }
  }

  async validate(email: string, pass: string): Promise<any> {
    const user: User = await this.authService.validateUser(email, pass);
    if (!user) {
      return Promise.reject(new Error('User or password are incorrect'));
    }
    return plainToClass(AuthUserDTO, user);
  }
}