
import { Booking } from 'src/booking/entities/booking.entity';
import { Event } from './../../event/entities/event.entity';
import { IsEmail } from 'class-validator';
import { Role } from 'src/Roles/roles.auth';
import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';



const shortUuid = uuidv4().slice(0,6)
@Entity()
export class User {

    @PrimaryGeneratedColumn()
       id:number


       @Column()
       name:string

       @Column()
       email:string

       @Column()
       phone:string

       @Column()
       password:string

       @Column({nullable:true})
        userName?:string

        @AfterInsert()
       addSignToUserName() {
          if (!this.userName.startsWith("@")) {
            this.userName=  `@${this.userName}_${shortUuid}`;
          }
       }
        
       @Column({
        type:"enum",
        enum:Role,
        default:Role.USER
   })
    role:Role


   @Column({nullable:true})
    profilePicture:string
       
     @CreateDateColumn({
       default: () => 'CURRENT_TIMESTAMP',
     })
     createdAt:Date
        

        @BeforeInsert()
        setDefaultUserame() {
          if (!this.userName) {
            this.userName =`@user_${shortUuid}`
          }
        }
        

       @OneToMany(() => Event,(event) => event.user,{cascade:true}) events:Event[]
    
       @OneToOne(()=> Booking,(booking) => booking.user,{cascade:true}) booking:Booking[]

}
