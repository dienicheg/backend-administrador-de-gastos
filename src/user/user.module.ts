import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

      ConfigModule.forRoot(),

      MongooseModule.forFeature([
        { 
          name: User.name, 
          schema: UserSchema 
        }
      ]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' }
      })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [ JwtModule, UserModule ]
})
export class UserModule {}
