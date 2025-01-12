import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,
      envFilePath: './config/.env.development'
     }), // Load environment variables globally
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmModuleConfig,
    }), DatabaseModule, ApplicationModule, AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
