import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async crear(dto: CrearUsuarioDto): Promise<Usuario> {
    const existe = await this.usuarioRepo.findOne({
      where: { email: dto.email },
    });
    if (existe) {
      throw new ConflictException('El email ya está registrado');
    }
    const usuario = this.usuarioRepo.create(dto);
    return this.usuarioRepo.save(usuario);
  }

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepo.find({ order: { createdAt: 'DESC' } });
  }

  async obtenerPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  async actualizar(id: number, dto: ActualizarUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    if (dto.email && dto.email !== usuario.email) {
      const existe = await this.usuarioRepo.findOne({
        where: { email: dto.email },
      });
      if (existe) {
        throw new ConflictException('El email ya está registrado');
      }
    }
    Object.assign(usuario, dto);
    return this.usuarioRepo.save(usuario);
  }

  async eliminar(id: number): Promise<void> {
    const resultado = await this.usuarioRepo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
  }
}
