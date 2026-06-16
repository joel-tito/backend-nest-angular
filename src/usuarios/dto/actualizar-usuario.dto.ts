import { IsOptional, IsString, IsEmail } from 'class-validator';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;
}
