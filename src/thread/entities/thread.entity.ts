import { Event } from "src/event/entities/event.entity";
import { User } from "src/user/entities/user.entity";
import { text } from "stream/consumers";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

 

@Entity()
 export class Thread {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
    

    @ManyToOne(() => User, (user) => user.thread,  {eager:true, onDelete:"CASCADE", onUpdate:"CASCADE"}) 
    user: User;
    

    @ManyToOne(() => Event, (event) => event.thread,  {eager:true, onDelete:"CASCADE", onUpdate:"CASCADE"}) 
    event: Event;

 }
