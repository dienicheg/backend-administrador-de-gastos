import { IsEnum, IsMongoId, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { CategoriaGasto } from "../interfaces/gasto-categoria.enum";

export class CreateGastoDto {
    
    @IsString()
    @MinLength(2)
    nombre: string

    @IsString()
    @IsEnum(CategoriaGasto)
    categoria: CategoriaGasto

    @IsNumber()
    @IsPositive()
    cantidad: number;
    
    @IsString()
    @IsMongoId()
    presupuesto: string
}
