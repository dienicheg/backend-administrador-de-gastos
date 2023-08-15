import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {

    // id: string // Mongo me lo da
    @Prop()
    name: string;

    @Prop({
        unique: true
    })
    email: string;

    @Prop()
    password: string

    @Prop({
        default: false
    })
    confirmado: boolean

    @Prop({
        default: true
    })
    isActive: boolean
    
}


export const UserSchema = SchemaFactory.createForClass( User );


