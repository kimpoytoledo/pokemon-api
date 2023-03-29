import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetPokemonDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  name: string;
}