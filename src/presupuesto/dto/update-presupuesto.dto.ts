import { PartialType } from '@nestjs/mapped-types';
import { CreatePresupuestoDto } from './create-presupuesto.dto';

export class UpdatePresupuestoDto extends PartialType(CreatePresupuestoDto) {}
