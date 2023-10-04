import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { GastosModule } from './gastos/gastos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.6w9cmb2.mongodb.net/admin-presupuesto`),
    UserModule,
    CommonModule,
    GastosModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {  }
