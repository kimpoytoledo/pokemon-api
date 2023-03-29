import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { IPokemonService } from '../../domain/pokemon/pokemon.interface';
import { GetPokemonDto } from './get-pokemon.dto';
import { Pokemon } from '../../domain/pokemon/pokemon.entity';
import { CustomResponse } from '../custom-response.interface';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: IPokemonService;

  beforeEach(async () => {
    const pokemonServiceMock: IPokemonService = {
      getPokemon: jest.fn().mockImplementation(async (name) => {
        if (name === 'bulbasaur') {
          const pokemon = new Pokemon();
          pokemon.id = 1;
          pokemon.name = 'bulbasaur';
          pokemon.height = 7;
          pokemon.weight = 69;
          return {
            pokemon,
            source: 'api',
          };
        } else {
          throw {
            status: 404,
            message: 'Pokemon not found',
          };
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        { provide: 'IPokemonService', useValue: pokemonServiceMock },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<IPokemonService>('IPokemonService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPokemon', () => {
    it('should return a Pokemon with source information', async () => {
      const getPokemonDto = new GetPokemonDto();
      getPokemonDto.name = 'bulbasaur';
    
      const pokemon = new Pokemon();
      pokemon.id = 1;
      pokemon.name = 'bulbasaur';
      pokemon.height = 7;
      pokemon.weight = 69;
    
      const result = {
        pokemon: pokemon,
        source: 'api',
      };
    
      jest.spyOn(service, 'getPokemon').mockImplementation(async () => result);
    
      const sendJsonMock = jest.fn();
      const res = { sendJson: sendJsonMock } as unknown as CustomResponse;
    
      await controller.getPokemon(getPokemonDto, res);
    
      expect(sendJsonMock).toHaveBeenCalledTimes(1);
      expect(sendJsonMock).toHaveBeenCalledWith(result);
    }, 10000);
    

    // Negative test
    it('should throw an error if Pokemon not found', async () => {
      const getPokemonDto = new GetPokemonDto();
      getPokemonDto.name = 'unknown-pokemon';
    
      const error = {
        status: 404,
        message: 'Pokemon not found',
      };
    
      jest.spyOn(service, 'getPokemon').mockRejectedValue(error);
    
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as CustomResponse;
    
      await expect(controller.getPokemon(getPokemonDto, res)).rejects.toEqual(error);
    }, 10000);
  });
});
