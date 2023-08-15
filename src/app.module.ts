import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PresupuestoModule } from './presupuesto/presupuesto.module';
import { CommonModule } from './common/common.module';
import { GastosModule } from './gastos/gastos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.6w9cmb2.mongodb.net/admin-presupuesto`),
    UserModule,
    PresupuestoModule,
    CommonModule,
    GastosModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {  }
