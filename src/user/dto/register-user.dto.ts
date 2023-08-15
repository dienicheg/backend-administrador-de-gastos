import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    name: string;
    
    @IsString()
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(8)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;


}
