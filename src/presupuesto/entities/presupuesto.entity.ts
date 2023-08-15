import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../user/entities/user.entity";

@Schema()
export class Presupuesto {

    @Prop()
    cantidad: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    usuario: User

}


export const PresupuestoSchema = SchemaFactory.createForClass( Presupuesto );
