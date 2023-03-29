import { ApiProperty } from '@nestjs/swagger';

export class PokemonSchema {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  weight: number;
}
