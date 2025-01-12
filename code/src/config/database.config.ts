import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';


export const dataSourceConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'development',
    password: process.env.DB_PASSWORD || 'development',
    database: process.env.DB_NAME || 'events',
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    synchronize: process.env.NODE_ENV === 'development', // Use true only for development
};

export const typeOrmModuleConfig: TypeOrmModuleOptions = {
    ...dataSourceConfig,
    autoLoadEntities: true,
};
