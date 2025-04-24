import { IsNotEmpty, IsEmail, Length, IsOptional } from "class-validator";

export class ContatoDTO {
  @IsNotEmpty()
  id_usuario!: number;

  @IsNotEmpty()
  @Length(9, 9)
  telefone_celular!: string;

  @IsOptional()
  @Length(9, 9)
  telefone_recado?: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Length(5, 100)
  endereco!: string;
}
