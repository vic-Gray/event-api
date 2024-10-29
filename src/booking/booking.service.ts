import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';

@Injectable()
export class BookingService {

  constructor(
    @InjectRepository(Booking) private readonly  BookingRepository: Repository<Booking>,@InjectRepository(Event) private readonly EventRepository: Repository<Event>,@InjectRepository(User) private readonly UserRepository: Repository<User>
  ){}
   async create(createBookingDto: CreateBookingDto ,user:any ,event:any ) {
       
    const userValid = await this.UserRepository.findOne({ where: { id: user.user.sub } });
    if (!userValid) {
       throw new  BadRequestException("sorry user does not exist")
    }
    const eventValid = await this.EventRepository.findOne({ where: { id: event.id } });
    if (!eventValid) {
       throw new  BadRequestException("sorry event does not exist")
    }
    const booking = this.BookingRepository.create({...createBookingDto, user, event})
   const eventBooked = this.BookingRepository.save(booking)
    return {
      eventBooked
    }


  }

 async  findAll() {
      const allUserBookedEvent = await this.BookingRepository.find()
      return allUserBookedEvent
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
