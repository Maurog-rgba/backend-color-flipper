import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserJwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryService } from '../repository/repository.service';

@Module({
  imports: [RepositoryModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UserJwtStrategy, RepositoryService],
})
export class AuthModule {}
