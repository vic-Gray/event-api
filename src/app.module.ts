import { type } from 'os';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { Event } from './event/entities/event.entity';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './sratagies/jwt.stratagy';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';




@Module({
  imports: [ TypeOrmModule.forRoot({
    type:"postgres",
    host:"aws-0-eu-central-1.pooler.supabase.com",
    database:"postgres",
    port:6543,
    username:"postgres.hbwebnfupbywebptrvro",
    password:"maxsolderme182005",
    entities:[Event,User,Booking],
    synchronize:true,
    // logging:true
  }), EventModule, UserModule, JwtModule.register({
    global:true,
    secret:"1234",
    signOptions:{expiresIn:"12h"}
  }), BookingModule, ],
  
  providers: [JwtStrategy],
})
export class AppModule {}
