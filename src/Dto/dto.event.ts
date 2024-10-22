import { IsPositive } from "class-validator";



export class eventDto{
    @IsPositive()
    readonly id:number
}