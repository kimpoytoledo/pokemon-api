import { ApiProperty } from '@nestjs/swagger';

export class Pokemon {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  weight: number;

  static fromObject(obj: any): Pokemon {
    const pokemon = new Pokemon();
    pokemon.id = obj.id;
    pokemon.name = obj.name;
    pokemon.height = obj.height;
    pokemon.weight = obj.weight;
    return pokemon;
  }
}
