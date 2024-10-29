
import { forwardRef, Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from 'src/sratagies/jwt.stratagy';
import { UserModule } from 'src/user/user.module';
import { Booking } from 'src/booking/entities/booking.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Event,User]), UserModule,],
  controllers: [EventController],
  providers: [EventService, JwtStrategy],
})
export class EventModule {}
