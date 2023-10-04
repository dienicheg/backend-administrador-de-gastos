import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Gasto } from './entities/gasto.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectModel(Gasto.name) private gastoModel: Model<Gasto>,
  ){}
  
  async create(createGastoDto: CreateGastoDto, req: Request) {
    const { _id } = req['user']
    
    const gasto = new this.gastoModel(createGastoDto)
    gasto.usuario = _id
    gasto.createdAt = new Date().toLocaleDateString('es-AR', {year: 'numeric', month: 'long', day:'2-digit'})

    await gasto.save()

    return gasto;
  }

  async findAll( req: Request ) {
    const { _id } = req['user']

    if(!isValidObjectId(_id)) throw new BadRequestException('El id del usuario debe ser un Mongo ID (usuario)')

    const gastos = await this.gastoModel.find({ usuario: _id })

    if( gastos.length === 0 ) throw new BadRequestException(`No se encontraron gastos con el id ${_id}`)
    
    return gastos ;
  }

  async findOne(id: string) {

    const gasto = await this.gastoModel.findById(id)

    if(!gasto) throw new BadRequestException(`No existe un gasto con el id ${id}`)

    return gasto;
  }

  async update(id: string, updateGastoDto: UpdateGastoDto) {
    const gastoActualizado = await this.gastoModel.findByIdAndUpdate(id, updateGastoDto, { new: true })

    if(!gastoActualizado) throw new BadRequestException('Gasto not found')

    return gastoActualizado;
  }

  async remove(id: string) {
    const gasto = await this.gastoModel.findByIdAndRemove(id)

    if(!gasto) throw new BadRequestException(`No existe un gasto con el id ${id}`)

    return {message: "Eliminado correctamente"};
  }
}
