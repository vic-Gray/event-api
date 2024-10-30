import { Role } from 'src/Roles/roles.auth';
import { IsEmail, IsNotEmpty, isNotEmpty, IsPositive, IsString } from "class-validator"

export class CreateEventDto {
   @IsNotEmpty({message:"sorry eventName cannot be empty"})
    readonly eventName:string
    @IsNotEmpty({message:"sorry eventName cannot be empty"})
    readonly description:string

    @IsNotEmpty({message:"sorry eventType cannot be empty"})
  readonly  eventType:string

  @IsString()
   location:string
   
   @IsPositive()
    price:number
    @IsNotEmpty({message:"sorry role cannot be empty"})
 
  readonly role:Role

   numberOfTicket:number
  
   @IsEmail()
    email: string
}
