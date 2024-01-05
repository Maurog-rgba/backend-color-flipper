import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PalleteService } from './pallete.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { CreatePalleteDto, UpdatePalleteDto } from './dto/pallete.dto';

@Controller('pallete')
export class PalleteController {
  constructor(private palleteService: PalleteService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  async getPallete(@GetUser() user: IUser) {
    return await this.palleteService.getPallete(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createPallete(
    @GetUser() user: IUser,
    @Body() createPalleteDto: CreatePalleteDto,
  ) {
    return await this.palleteService.createPallete(user, createPalleteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update/:id')
  async updatePallete(
    @GetUser() user: IUser,
    @Body() updatePalleteDto: UpdatePalleteDto,
    @Req() id: number,
  ) {
    return await this.palleteService.updatePallete(user, id, updatePalleteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async deletePallete(@GetUser() user: IUser, @Req() id: number) {
    return await this.palleteService.deletePallete(user, id);
  }
}
