import { IsNumber, IsPositive } from "class-validator";

export class UpdatePresupuestoDto {

    @IsNumber()
    @IsPositive()
    presupuesto: number;

}
