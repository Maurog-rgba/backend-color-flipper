import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RepositoryService } from '../../repository/repository.service';

// to verify the token if the token is valid
@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private repositoryService: RepositoryService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { id: number }) {
    try {
      const user = await this.repositoryService.user.findUnique({
        where: {
          id: payload.id,
        },
      });
      if (user) {
        delete user.password_hash;
        const { id } = user;
        return { id };
      }
    } catch (error) {
      return new HttpException('UnAuthorized User', HttpStatus.UNAUTHORIZED);
    }
  }
}
