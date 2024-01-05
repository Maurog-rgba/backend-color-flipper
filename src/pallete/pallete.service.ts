import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';
import { CreatePalleteDto, UpdatePalleteDto } from './dto/pallete.dto';

@Injectable()
export class PalleteService {
  constructor(private repository: RepositoryService) {}

  async getPallete(user: IUser) {
    const { id } = user;

    if (!id)
      return new HttpException(
        'Unauthorised User, Faça o login novamente',
        HttpStatus.UNAUTHORIZED,
      );

    const pallete = await this.repository.pallete.findMany({
      where: { userId: id },
    });

    return pallete;
  }

  async createPallete(user: IUser, createPalleteDto: CreatePalleteDto) {
    const { id } = user;

    if (!id)
      return new HttpException(
        'Unauthorised User, Faça o login novamente',
        HttpStatus.UNAUTHORIZED,
      );

    const pallete = await this.repository.pallete.create({
      data: {
        ...createPalleteDto,
        userId: id,
      },
    });

    return {
      message: 'Pallete criada com sucesso',
      pallete,
    };
  }

  async updatePallete(
    user: IUser,
    palleteId: number,
    updatePalleteDto: UpdatePalleteDto,
  ) {
    const { id } = user;

    if (!id)
      return new HttpException(
        'Unauthorised User, Faça o login novamente',
        HttpStatus.UNAUTHORIZED,
      );

    const pallete = await this.repository.pallete.update({
      where: { id: palleteId },
      data: {
        ...updatePalleteDto,
      },
    });

    return {
      message: 'Pallete atualizada com sucesso',
      pallete,
    };
  }

  async deletePallete(user: IUser, palleteId: number) {
    const { id } = user;

    if (!id)
      return new HttpException(
        'Unauthorised User, Faça o login novamente',
        HttpStatus.UNAUTHORIZED,
      );

    const pallete = await this.repository.pallete.delete({
      where: { id: palleteId },
    });

    return {
      message: 'Pallete deletada com sucesso',
      pallete,
    };
  }
}
