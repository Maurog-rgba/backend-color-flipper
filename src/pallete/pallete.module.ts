import { Module } from '@nestjs/common';
import { PalleteService } from './pallete.service';
import { PalleteController } from './pallete.controller';

@Module({
  providers: [PalleteService],
  controllers: [PalleteController]
})
export class PalleteModule {}
