import { Injectable,NotFoundException  } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../../domain/pokemon/pokemon.entity';
import { IPokemonService } from '../../domain/pokemon/pokemon.interface';
import { RedisService } from '../../infra/redis/redis.service';

@Injectable()
export class PokemonService implements IPokemonService {
  constructor(
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
  ) {}

  async getPokemon(name: string): Promise<{ pokemon: Pokemon; source: string }> {
    const { data, source } = await this.redisService.cache(`pokemon_${name}`, async () => {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;

      const pokemon$: Observable<AxiosResponse<any>> = this.httpService.get(
        apiUrl,
      );
      const pokemon = await pokemon$
        .pipe(
          map((response) => {
            const { id, name, height, weight } = response.data;
            const pokemon = Pokemon.fromObject({ id, name, height, weight });
            return pokemon;
          }),
        )
        .toPromise().catch((error) => {
          if (error.response && error.response.status === 404) {
            throw new NotFoundException('Pokemon not found');
          } else {
            throw new Error('Failed to get Pokemon');
          }
        });

      return { pokemon, source: 'API' };
    });

    return { pokemon: data.pokemon, source };
  }
}