import { IsPositive, isPositive } from "class-validator";

export class CreateBookingDto {

    @IsPositive()
    readonly eventId: number;


    @IsPositive()
    readonly numberOfTickets:number

}
