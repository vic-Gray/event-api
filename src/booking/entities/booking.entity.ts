import { User } from "src/user/entities/user.entity";
import { Event } from "src/event/entities/event.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  bookingDate: Date;


  @Column({ default: "pending", nullable: true })
  bookingStatus: string;

  @Column({ nullable: true, default: 1 })
  numberOfTickets: number;

  @ManyToOne(() => User, (user) => user.booking, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" }) 
  user: User;

  @ManyToOne(() => Event, (event) => event.booking, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
  event: Event; 
}
