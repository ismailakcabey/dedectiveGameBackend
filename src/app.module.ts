import { CacheModule, CacheStore, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserTable } from './modules/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { IpBlockMiddleware } from './middlewares/ipBlock.middleware';
import { UserController } from './modules/user/user.controller';
import { AuthController } from './modules/auth/auth.controller';
import { EventTable } from './modules/event/event.entity';
import { EventModule } from './modules/event/event.module';
import { ExpressionTable } from './modules/expression/expression.entity';
import { ExpressionModule } from './modules/expression/expression.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {
              expiresIn: '1d'
            }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService
      )=>({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          UserTable,
          EventTable,
          ExpressionTable
        ],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        host:configService.get('REDIS_HOST'),
        port:configService.get<number>('REDIS_PORT'),
        isGlobal: true,
        store: (await redisStore({
          url: configService.get('REDIS_URL'),
          ttl:300
        })) as unknown as CacheStore,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    EventModule,
    ExpressionModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
  configure(
    consumer:MiddlewareConsumer
  ){
    consumer.apply(IpBlockMiddleware).forRoutes(UserController,AuthController)
  }
}
