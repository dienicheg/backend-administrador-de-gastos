import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CategoriaGasto } from "../interfaces/gasto-categoria.enum";
import { User } from "src/user/entities/user.entity";

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

    @Prop({type: String})
    createdAt: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    usuario: User
}


export const GastoSchema = SchemaFactory.createForClass( Gasto );