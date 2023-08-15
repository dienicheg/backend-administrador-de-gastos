import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Presupuesto } from "../../presupuesto/entities/presupuesto.entity";
import { CategoriaGasto } from "../interfaces/gasto-categoria.enum";

@Schema()
export class Gasto {

    @Prop({
        type: Number
    })
    cantidad: number;

    @Prop({ 
        type: String, 
        enum: CategoriaGasto 
    })
    categoria: string

    @Prop()
    nombre: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Presupuesto'    
    })
    presupuesto: Presupuesto

}


export const GastoSchema = SchemaFactory.createForClass( Gasto );
