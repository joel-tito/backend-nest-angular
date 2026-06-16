import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crear(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crear(dto);
  }

  @Get()
  listar() {
    return this.usuariosService.listar();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerPorId(id);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarUsuarioDto,
  ) {
    return this.usuariosService.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.eliminar(id);
  }
}
