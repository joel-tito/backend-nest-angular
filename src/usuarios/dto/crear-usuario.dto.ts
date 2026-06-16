import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;
}
