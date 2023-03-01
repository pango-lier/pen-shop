import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJwtAuthDto } from './dto/create-jwt-auth.dto';
import { UpdateJwtAuthDto } from './dto/update-jwt-auth.dto';
import { User } from '../../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { comparePwd, encodePwd } from '../../common/utils/bcrypt';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUser } from './interface/authenticated-user.interface';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersStore } from '../../users/users.store';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly userStore: UsersStore,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
    };
    const { accessToken, refreshToken } = await this.getTokens(payload);
    await this.setCurrentRefreshToken(refreshToken, user.id);
    return {
      userData: { id: user.id, username: user.username, email: user.email },
      accessToken,
      refreshToken,
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: this.configService.get<number>('jwt.accessToken.ttl'),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userStore.findByUsername(username);
    if (user) {
      const matched = comparePwd(password, user.password);
      if (matched) {
        const { password, ...rest } = user;
        return rest;
      }
    }
    return null;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userStore.findById(+userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens({
      sub: user.id,
      username: user.username,
    });
    await this.setCurrentRefreshToken(tokens.refreshToken, user.id);
    return tokens;
  }

  private getTokenOptions(type: string) {
    const options: JwtSignOptions = {
      secret: this.configService.get(`jwt.${type}Token.secret`),
    };
    const expiration = this.configService.get<number>(`jwt.${type}Token.ttl`);
    if (expiration) {
      options.expiresIn = expiration;
    }
    return options;
  }

  async getMe(authUser: AuthenticatedUser): Promise<User> {
    try {
      const user = await this.userStore.findById(authUser.id);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const user = await this.userStore.updateUser(userId, {
      refreshToken: currentHashedRefreshToken,
    });
    if (!user) {
      throw new ConflictException();
    }
    return user;
  }

  async removeRefreshToken(userId: number) {
    const user = await this.userStore.updateUser(userId, {
      refreshToken: null,
    });
    if (!user) {
      throw new ConflictException();
    }
    return user;
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.userStore.findByUsername(
      createUserDto.username,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await encodePwd(createUserDto.password);
    const newUser = await this.userStore.createNewUser({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens({
      sub: newUser.id,
      username: newUser.username,
    });
    await this.setCurrentRefreshToken(tokens.refreshToken, newUser.id);
    return tokens;
  }

  async getTokens(payload: JwtPayload) {
    const refresh = this.getTokenOptions('refresh');
    const access = this.getTokenOptions('access');
    const [refreshToken, accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, refresh),
      this.jwtService.signAsync(payload, access),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
