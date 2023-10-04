import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { Auth } from 'src/user/decorators/app.decorator';

@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Auth()
  @Post()
  create(
    @Body() createGastoDto: CreateGastoDto, 
    @Request() req: Request
  ) {
    return this.gastosService.create(createGastoDto, req);
  }

  @Auth()
  @Get()
  findAll(@Request() req: Request) {
    return this.gastosService.findAll(req);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.gastosService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string, 
    @Body() updateGastoDto: UpdateGastoDto
  ) {
    return this.gastosService.update(id, updateGastoDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.gastosService.remove(id);
  }
}
