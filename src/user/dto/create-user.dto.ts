import { isString, IsString, Length } from 'class-validator';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { Role } from 'src/Roles/roles.auth';

export class CreateUserDto {
    
    @IsEmail()
    readonly email:string

     @IsPhoneNumber("AM")
    readonly  phone:string

       
    readonly   password:string

      @IsString()
    readonly name:string
     

    @IsString()
    readonly role:Role


    @Length(0,4)
    readonly userName:string
}
