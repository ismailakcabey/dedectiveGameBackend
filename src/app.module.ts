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
import { ClueModule } from './modules/clue/clue.module';
import { ClueTable } from './modules/clue/clue.entity';
import { CardExtraTable } from './modules/cardExtra/cardExtra.entity';
import { CardExtraModule } from './modules/cardExtra/cardExtra.module';
import { MessageTable } from './modules/message/message.entity';
import { MessageModule } from './modules/message/message.module';
import { TeamModule } from './modules/team/team.module';
import { TeamTable } from './modules/team/team.entity';
import { TeamGateway } from './websockets/team.gateway';
import { ReportModule } from './modules/report/report.module';
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
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('POSTGRES_URL'),
        entities: [
          UserTable,
          EventTable,
          ExpressionTable,
          ClueTable,
          CardExtraTable,
          MessageTable,
          TeamTable,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
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
    ExpressionModule,
    ClueModule,
    CardExtraModule,
    MessageModule,
    TeamModule,
    ReportModule,
    TypeOrmModule.forFeature([TeamTable]),
    TypeOrmModule.forFeature([UserTable]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TeamGateway,
  ],
})
export class AppModule {
  configure(
    consumer:MiddlewareConsumer
  ){
    consumer.apply(IpBlockMiddleware).forRoutes(UserController,AuthController)
  }
}
