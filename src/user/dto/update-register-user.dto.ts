import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
