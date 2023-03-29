import { Pokemon } from './pokemon.entity';

export interface IPokemonService {
  getPokemon(name: string): Promise<{ pokemon: Pokemon; source: string }>;
}
