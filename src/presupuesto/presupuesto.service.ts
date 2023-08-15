import { Request } from 'express';
import { Model } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
import { UpdatePresupuestoDto } from './dto/update-presupuesto.dto';
import { Presupuesto } from './entities/presupuesto.entity';

@Injectable()
export class PresupuestoService {
  constructor(
    @InjectModel(Presupuesto.name) private presupuestoModel: Model<Presupuesto>,

  ){}

  async create(createPresupuestoDto: CreatePresupuestoDto, req: Request) {

    const presupuesto = new this.presupuestoModel(createPresupuestoDto)

    presupuesto.usuario = req['user']

    await presupuesto.save()

    return { presupuesto: presupuesto.cantidad };
  }

  async findAll(req: Request) {

    const presupuestos = await this.presupuestoModel.find({usuario: req['user']['_id']}) 
    
    return {
      total: presupuestos.length,
      presupuestos
    };
  }

  async findOne(id: string) {

    const presupuesto = await this.presupuestoModel.findById(id)
    if( !presupuesto ) throw new BadRequestException('Presupuesto not found') 

    return {
      presupuesto
    };
  }

  async update(id: string, updatePresupuestoDto: UpdatePresupuestoDto) {

    const presupuestoActualizado = await this.presupuestoModel.findByIdAndUpdate(id, updatePresupuestoDto, { new: true })

    if(!presupuestoActualizado) throw new BadRequestException('Presupuesto not found')

    return {presupuestoActualizado};
  }

  async remove(id: string) {

    const presupuestoEliminado = await this.presupuestoModel.findByIdAndRemove(id)

    if(!presupuestoEliminado) throw new BadRequestException('El presupuesto que intentas eliminar no existe en la base de datos')
    
    return `Presupuesto eliminado correctamente, id: ${id}`
  }
}
