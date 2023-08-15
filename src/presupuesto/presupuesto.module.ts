import { Module } from '@nestjs/common';
import { PresupuestoService } from './presupuesto.service';
import { PresupuestoController } from './presupuesto.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Presupuesto, PresupuestoSchema } from './entities/presupuesto.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    JwtModule,
    MongooseModule.forFeature([
      { 
        name: Presupuesto.name, 
        schema: PresupuestoSchema 
      }
    ]),
    MongooseModule.forFeature([
      { 
        name: User.name, 
        schema: UserSchema 
      }
    ]),
  ],
  controllers: [PresupuestoController],
  providers: [PresupuestoService ],
  exports: [PresupuestoModule]
})
export class PresupuestoModule {}
