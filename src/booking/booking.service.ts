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
  async create(createBookingDto: CreateBookingDto, userId: number, eventId: number,) {

    const userValid = await this.UserRepository.findOneBy({ id: userId });
    if (!userValid) {
        throw new BadRequestException("Sorry, user does not exist");
    }
    
 


    const eventValid = await this.EventRepository.findOne({ where: { id: eventId } });
    if (!eventValid) {
        throw new BadRequestException("Sorry, event does not exist");
    }
    await this.EventRepository.save(eventValid); 

  
    const booking = this.BookingRepository.create({
        ...createBookingDto,
        user: userValid,
        event: eventValid,
    });
    if (eventValid.numberOfTicket< 1) {
      throw new BadRequestException("Sorry, no available tickets for this event.");
  }


  eventValid.numberOfTicket -= 1;
  await this.EventRepository.save(eventValid); 

    const eventBooked = await this.BookingRepository.save(booking);
    return {
        eventBooked,
    };
}


 async  GetBooking(CreateBookingDto:CreateBookingDto,id:number, eventId:number,userId:number) {
    const user = await this.UserRepository.findOneBy({id})
    if (!user) {
      throw new BadRequestException("sorry user not found")
    }
    const eventValid = await this.EventRepository.findOne({ where: { id: eventId } });

    if (!eventValid) {
      throw new BadRequestException("sorry this event dodes not exist")
    }

    return{
      user,
      eventId,
      CreateBookingDto
    }
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
