import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread)private readonly threadRepository:Repository<Thread>, @InjectRepository(User)private readonly userRepository:Repository<User>, @InjectRepository(Event)private readonly eventRepository:Repository<Event>
  ){}

  create(createThreadDto: CreateThreadDto) {
    return 'This action adds a new thread';
  }

  findAll() {
    return `This action returns all thread`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thread`;
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return `This action updates a #${id} thread`;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}
