import { Controller, Get, Param, Inject, UsePipes, ValidationPipe, NotFoundException, Res } from '@nestjs/common';
import { Pokemon } from '../../domain/pokemon/pokemon.entity';
import { IPokemonService } from '../../domain/pokemon/pokemon.interface';
import { GetPokemonDto } from './get-pokemon.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CustomResponse } from '../custom-response.interface';

@Controller('pokemon')
@ApiTags('pokemon')
export class PokemonController {
  constructor(
    @Inject('IPokemonService') private readonly pokemonService: IPokemonService,
  ) {}

  @Get(':name')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Get a Pokemon by name' })
  @ApiParam({ name: 'name', description: 'The name of the Pokemon', example: 'bulbasaur' })
  @ApiOkResponse({
    description: 'The Pokemon was successfully found',
    type: Pokemon,
  })
  @ApiResponse({
    status: 404,
    description: 'The Pokemon was not found',
  })
  async getPokemon(@Param() params: GetPokemonDto,@Res() res: CustomResponse): Promise<void> {
    try {
      const { pokemon, source } = await this.pokemonService.getPokemon(params.name);
      res.sendJson({ pokemon, source });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Pokemon not found');
      } else {
        throw error;
      }
    }
  }
}
