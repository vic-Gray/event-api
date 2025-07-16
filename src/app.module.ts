import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { CommentModule } from './comment/comment.module';

import { Event } from './event/entities/event.entity';
import { User } from './user/entities/user.entity';
import { Booking } from './booking/entities/booking.entity';

import { JwtStrategy } from './sratagies/jwt.stratagy';
import { EventsService } from './events/events.service';
import { EventsController } from './events/events.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Event, User, Booking],
        synchronize: true,
      }),
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
      }),
    }),

    EventModule,
    UserModule,
    BookingModule,
    CommentModule,
  ],
  providers: [JwtStrategy, EventsService],
  controllers: [EventsController],
})
export class AppModule {}
