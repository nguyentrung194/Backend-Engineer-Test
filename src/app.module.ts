import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import redisConfig from './config/redis.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { LoggerModule } from './logger/logger.module';
import { UrlsModule } from './url/urls.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { BlacklistsModule } from './blacklists/blacklists.module';
// import space

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, redisConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore.redisStore({
          socket: {
            host: configService.get('redis.redisHost', { infer: true }),
            port: configService.get('redis.redisPort', { infer: true }),
          },
          database: 0,
          username: configService.get('redis.redisUser', { infer: true }),
          password: configService.get('redis.redisPass', { infer: true }),
          // In cache-manager@^5 this value is in milliseconds
          ttl: 5 * 60 * 1000, // 5 minutes (milliseconds)
        });

        return {
          store: store as unknown as CacheStore,
          host: configService.get('redis.redisHost', { infer: true }),
          port: configService.get('redis.redisPort', { infer: true }),
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    SessionModule,
    BlacklistsModule,
    HomeModule,
    LoggerModule,
    UrlsModule,
  ],
  providers: [],
})
export class AppModule {}
