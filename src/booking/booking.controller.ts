import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UserGuard } from 'src/Roles/user.guards';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('bookings')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(UserGuard)
  @Post(':eventId')
  async createBooking(
      @Body() createBookingDto: CreateBookingDto,
      @Param('eventId') eventId: number, 
      @Request() req: any 
  ) {
      const userId = req.user.sub;
      return await this.bookingService.create(createBookingDto, userId, eventId, );
  }
  @UseGuards(UserGuard)
  @Get(':eventId')
  async GetBooking(
      @Body() createBookingDto: CreateBookingDto,
      @Param('eventId') eventId: number, 
      @Request() req: any 
  ) {
      const userId = req.user.sub;
      return await this.bookingService.create(createBookingDto, userId, eventId, );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
