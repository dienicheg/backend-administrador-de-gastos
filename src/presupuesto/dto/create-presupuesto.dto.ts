import { IsNumber, IsPositive } from "class-validator";

export class CreatePresupuestoDto {

    @IsNumber()
    @IsPositive()
    cantidad: number;

}
