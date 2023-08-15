import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Gasto } from './entities/gasto.entity';
import { PresupuestoId } from './interfaces/presupuesto-id.interface';

@Injectable()
export class GastosService {
  constructor(
    @InjectModel(Gasto.name) private gastoModel: Model<Gasto>,
  ){}
  
  async create(createGastoDto: CreateGastoDto) {
    
    const gasto = new this.gastoModel(createGastoDto)

    await gasto.save()

    return {gasto};
  }

  async findAll(presupuestoId: PresupuestoId) {

    const { presupuesto } = presupuestoId

    if(!isValidObjectId(presupuesto)) throw new BadRequestException('El id del presupuesto debe ser un Mongo ID (presupuesto)')

    const gastos = await this.gastoModel.find({ presupuesto })

    if(gastos.length === 0 ) throw new BadRequestException(`No se encontraron gastor con el id ${presupuesto}`)
    
    return {gastos};
  }

  async findOne(id: string) {

    const gasto = await this.gastoModel.findById(id)

    if(!gasto) throw new BadRequestException(`No existe un gasto con el id ${id}`)

    return {gasto};
  }

  async update(id: string, updateGastoDto: UpdateGastoDto) {
    const gastoActualizado = await this.gastoModel.findByIdAndUpdate(id, updateGastoDto, { new: true })

    if(!gastoActualizado) throw new BadRequestException('Gasto not found')

    return {gastoActualizado};
  }

  async remove(id: string) {
    const gasto = await this.gastoModel.findByIdAndRemove(id)

    if(!gasto) throw new BadRequestException(`No existe un gasto con el id ${id}`)

    return "Eliminado correctamente";
  }
}
