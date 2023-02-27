import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
// import { addTransactionalDataSource } from 'typeorm-transactional';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                ...configService.get('database'),
            }),
            dataSourceFactory: async (options: MysqlConnectionOptions) => {
                if (!options) throw new Error('Invalid options passed');

                const dataSource = new DataSource(options);
                await dataSource.initialize();

                return dataSource;
            },
        }),
    ],
})
export class DatabaseModule { }
