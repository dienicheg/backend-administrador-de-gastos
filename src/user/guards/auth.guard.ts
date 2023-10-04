import { Request } from 'express';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,

    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not valid');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );

      const user = await this.validate(payload)

      request['user'] = user;
    } catch(error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async validate(payload: JwtPayload) {
    const { id } = payload
    
    const user = await this.userModel.findById( id )

    if(!user) throw new UnauthorizedException('Token not valid')

    if( !user.isActive ) throw new UnauthorizedException('Token not valid - user is inactive')
    return user
  }
}