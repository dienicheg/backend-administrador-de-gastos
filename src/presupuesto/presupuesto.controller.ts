import { Request } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PresupuestoService } from './presupuesto.service';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
import { UpdatePresupuestoDto } from './dto/update-presupuesto.dto';
import { Auth } from '../user/decorators/app.decorator';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('presupuesto')
export class PresupuestoController {
  constructor(
    private readonly presupuestoService: PresupuestoService,
  ) {}

  @Auth()
  @Post()
  create(@Body() createPresupuestoDto: CreatePresupuestoDto, @Req() req: Request) {
    return this.presupuestoService.create(createPresupuestoDto, req);
  }

  @Auth()
  @Get()
  findAll(@Req() req: Request) {
    return this.presupuestoService.findAll(req);
  }

  // @Auth()
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.presupuestoService.findOne(id);
  }

  // @Auth()
  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updatePresupuestoDto: UpdatePresupuestoDto) {
    return this.presupuestoService.update(id, updatePresupuestoDto);
  }

  // @Auth()
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.presupuestoService.remove(id);
  }
}
