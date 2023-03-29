import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';
import { RedisService } from '../../infra/redis/redis.service';
import { Pokemon } from '../../domain/pokemon/pokemon.entity';
import { map, of } from 'rxjs';


interface MockApiResponse {
  data: {
    id: number;
    name: string;
    height: number;
    weight: number;
  };
}

describe('PokemonService', () => {
  let service: PokemonService;
  let httpService: HttpService;
  let redisService: RedisService;

  beforeEach(async () => {
    const httpServiceMock = {
      get: jest.fn().mockReturnValue(
        of({
          data: {
            id: 1,
            name: 'bulbasaur',
            height: 7,
            weight: 69,
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }).pipe(
          map((response) => {
            const { id, name, height, weight } = response.data;
            const pokemon = new Pokemon();
            pokemon.id = id;
            pokemon.name = name;
            pokemon.height = height;
            pokemon.weight = weight;
            return pokemon;
          }),
        ),
      ),
    };

    const redisServiceMock = {
      cache: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RedisService, useValue: redisServiceMock },
      ],
    }).compile();
  
    service = module.get<PokemonService>(PokemonService);
    httpService = module.get<HttpService>(HttpService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPokemon', () => {
    it('should return a Pokemon with source information', async () => {
      const pokemonName = 'bulbasaur';

      const mockPokemonData = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
      };

      const mockApiResponse: MockApiResponse = {
        data: {
          id: 1,
          name: 'bulbasaur',
          height: 7,
          weight: 69,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as MockApiResponse;
      

      const expectedResult = {
        pokemon: Pokemon.fromObject(mockPokemonData),
        source: 'API',
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockApiResponse as any));
      jest.spyOn(redisService, 'cache').mockResolvedValue({
        data: expectedResult,
        source: expectedResult.source,
      });

      const result = await service.getPokemon(pokemonName);

      expect(result).toEqual(expectedResult);
    });
  });
});
