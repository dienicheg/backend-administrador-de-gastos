import { Controller, Post, Body, Get, Request, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './decorators/app.decorator';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { UpdatePresupuestoDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto)
  }
  
  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string, 
    @Body() updatePresupuestoDto: UpdatePresupuestoDto
  ) {
    return this.userService.update(id, updatePresupuestoDto);
  }

  @Auth()
  @Get('check-token')
  checkToken(@Request() req: Request) {
    
    const user = req['user']
    return {
      token: this.userService.getJWT({id: user._id}),
      user
    }

  }

  // @Auth()
  // @Get('private')
  // privateRoute(
  // ){
  //   return 'Todo ok'
  // }
}
