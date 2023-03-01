import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthController } from './jwt-auth.controller';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenStrategy } from './strategy/refresh.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.accessToken.secret'),
        signOptions: {
          expiresIn: configService.get<number>('jwt.accessToken.ttl'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [JwtAuthController],
  providers: [JwtAuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
