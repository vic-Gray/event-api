import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
 export class Booking {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    eventId: number;

    @Column()
    bookingDate: Date;

    @Column( {default:" pending", nullable:true})
    bookingStatus:string;
     

    @Column({nullable:true, default: 1})
    numberOfTickets:number
   

    @ManyToOne(() => User, (user) => user.booking,  {eager:true, onDelete:"CASCADE", onUpdate:"CASCADE"}) // Many bookings to one user
    user: User;

    @OneToMany(()=> Booking,(event) => event.booking,{}) event:Event[]  
    booking: any;
 }
