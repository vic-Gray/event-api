import { IsEmail, IsString, IsStrongPassword } from "class-validator";



export class logInDto{
    @IsEmail()
    email:string;
    @IsString()
    password:string;
}