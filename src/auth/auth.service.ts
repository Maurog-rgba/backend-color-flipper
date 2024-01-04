import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RepositoryService } from 'src/repository/repository.service';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private repositoryService: RepositoryService,
    private configsService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async loginUser(dto: LoginDto) {
    try {
      const { email, password } = dto;
      const user = await this.repositoryService.user.findUnique({
        where: { email },
      });
      const { id, password_hash, salt } = user;
      const comparePassword = await this.passwordHash(password, salt);
      const isMatch = comparePassword === password_hash;

      if (user && isMatch) {
        return await this.signToken(id);
      } else {
        return new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(dto: CreateUserDto) {
    try {
      const { name, email, username, password } = dto;
      const salt = await bcrypt.genSalt();
      const password_hash = await this.passwordHash(password, salt);
      const user = await this.repositoryService.user.create({
        data: {
          name,
          username,
          email,
          password_hash,
          salt,
        },
      });
      delete user.password_hash;
      return user;
    } catch (error) {
      if (error.code === '23505') {
        return new HttpException('User already exist', HttpStatus.CONFLICT);
      } else {
        console.log("err", error);
        throw new InternalServerErrorException();
      }
    }
  }

  async signToken(id: number): Promise<{ token: string }> {
    try {
      const payload = {
        id,
      };
      const secret = this.configsService.get('JWT_SECRET');
      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '3d',
        secret,
      });

      return { token: token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async passwordHash(password: string, salt: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
