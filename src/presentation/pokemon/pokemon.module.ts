import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../../application/pokemon/pokemon.service';
import { IPokemonService } from '../../domain/pokemon/pokemon.interface';
import { HttpModule } from '@nestjs/axios';
import { RedisService } from '../../infra/redis/redis.service';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [PokemonController],
  providers: [
    {
      provide: 'IPokemonService',
      useClass: PokemonService
    },
    RedisService
  ],
})
export class PokemonModule {}
