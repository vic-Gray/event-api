import { EventModule } from './../event/event.module';
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Booking, Event,User]), ],
  controllers: [BookingController],
  providers: [BookingService],
  
})
export class BookingModule {}
