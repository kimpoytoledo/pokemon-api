import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { RedisModule } from '../infra/redis/redis.module';
import { JsonMiddleware } from './middleware/response-format.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PokemonModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JsonMiddleware).forRoutes('*');
  }
}