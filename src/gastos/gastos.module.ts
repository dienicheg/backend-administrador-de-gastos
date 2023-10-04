import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosController } from './gastos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Gasto, GastoSchema } from './entities/gasto.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: User.name, 
        schema: UserSchema
      }
    ]),
    MongooseModule.forFeature([
      { 
        name: Gasto.name, 
        schema: GastoSchema
      }
    ]),
    GastosModule,
    JwtModule
  ],
  controllers: [GastosController],
  providers: [GastosService]
})
export class GastosModule {}
