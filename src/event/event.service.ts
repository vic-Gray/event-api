import { User } from './../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException, Patch, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Event } from './entities/event.entity';
import { eventNames } from 'process';

@Injectable() 
export class EventService {

  constructor(
    @InjectRepository(Event) private readonly eventRepository:Repository<Event>,@InjectRepository(User) private readonly userRepository:Repository<User>
  ){}



  async create(createEventDto: CreateEventDto, user: any) {
    // Log the user object from the JWT
    const realUser = user
    console.log('User from JWT:', user);
     const userProfile = [
       user.user.name,
       user.user.username,
       user.user.email
     ]
    const userValid = await this.userRepository.findOne({ where: { id: user.user.sub } });
  
    console.log('User from Database:', userValid);
  
    if (!userValid) {
      throw new UnauthorizedException('Sorry, cannot create this event');
    }
  
    const newEvent = this.eventRepository.create({
      ...createEventDto,
      user: userValid,  
    });

    const latest = await this.eventRepository.save(newEvent,user);
 
    console.log('Saved Event:', latest);
  
    return {
      userProfile,
      latest
    };
  }


  async findAll() {
     const allEvents = await this.eventRepository.find()
     return allEvents
  }

   async  findOne(id: number ) {
      
    const findOneEvent = await this.eventRepository.findOneBy({id})

      if (!findOneEvent) {
        throw new UnauthorizedException("this event was not found")
      }
    
      return {
        description:findOneEvent.description,
        eventName:findOneEvent.eventName,
        eventType:findOneEvent.eventType
      }
  }

  async updateProfilePicture(id: number, profilePictureUrl: string): Promise<User> {
    const user = await this.eventRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user. eventProfilePhoto = profilePictureUrl;  // Assuming the User entity has a `profilePicture` field
    return this.userRepository.save(user);  // Save updated user with profile picture
  }

  async updateCoverPhoto(id: number, profilePictureUrl: string): Promise<User> {
    const user = await this.eventRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException();
    }

    user. eventProfilePhoto = profilePictureUrl;  // Assuming the User entity has a `profilePicture` field
    return this.userRepository.save(user);  // Save updated user with profile picture
  }


   async getEventPhoto(id:number){
     try{
      const user = await this.eventRepository.findOneBy({id})
      if(!user){
        throw new BadRequestException();
      }
      return{user:id, userProfile:user.eventProfilePhoto}
     }catch(error){
      throw new BadRequestException();
     }
   }
   async update(id: number, updateEventDto: UpdateEventDto,  ) {
    const eventToUpdate = await this.eventRepository.findOneBy({id})

    if (!eventToUpdate) {
      throw new UnauthorizedException("sorry cannot update this event")
    }
    
    this.eventRepository.merge(eventToUpdate, updateEventDto)
    const updatedEvent = await this.eventRepository.save(eventToUpdate)
     
    return {
    message:"your event has been update successfully"
    }
  }

    async remove(id: number) {
    const eventId = await this.eventRepository.findOneBy({id})

    if (!eventId) {
        throw new UnauthorizedException("sorry cannot find this event")
    }

    const deletedEvent = await this.eventRepository.remove(eventId)
  return {
    message:"this event has been deleted sussefully",
  }
  }
}
