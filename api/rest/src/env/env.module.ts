import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import ioredis from './ioredis';
import queueConfig from './queue.config';
import s3Config from './s3.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            cache: false,
            load: [databaseConfig, authConfig, queueConfig, ioredis, s3Config],
        }),
    ],
})
export class EnvModule { }
