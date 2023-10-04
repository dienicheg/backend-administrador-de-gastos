import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-register-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UpdatePresupuestoDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {

    const { email, password, name } = createUserDto

    const userDuplicado = await this.userModel.find({email})

    if( userDuplicado.length !== 0 ) 
      throw new BadRequestException(`Ya existe un usuario con el email "${email}"`)

   try {

    const user = new this.userModel(createUserDto);

    user.password = await bcrypt.hash(password, 10)

    user.save();

    return {
      msg: 'Usuario registrado correctamente',
      user: {
        email, 
        name
      }
    }
   } catch (error) {
    throw new InternalServerErrorException('Please talk with an admin')
   }
  
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto

    const user = await this.userModel.findOne({email})
    
    if( !user ) throw new BadRequestException('No existe un usuario con ese email')


    if(!bcrypt.compareSync(password, user.password)) 
      throw new BadRequestException('Credenciales incorrectas (password)')

      const payload = { id: user._id }
    return {
      user,
      token: this.jwtService.sign(payload)
    }
  }

  async update(id: string, {presupuesto}: UpdatePresupuestoDto) {

    const user = await this.userModel.findByIdAndUpdate(id, {
      presupuesto
    }, { new: true })

    if(!user) throw new BadRequestException(`No se encontró el usuario con id: ${id}`)

    return user
    
  }

  getJWT( payload: JwtPayload){
    const token = this.jwtService.sign(payload)
    return token
  }

}
