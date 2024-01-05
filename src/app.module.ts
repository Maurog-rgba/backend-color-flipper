import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PalleteModule } from './pallete/pallete.module';

@Module({
  imports: [
    RepositoryModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PalleteModule,
  ],
})
export class AppModule {}
