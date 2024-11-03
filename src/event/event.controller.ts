import { UserService } from 'src/user/user.service';
import { User } from './../user/entities/user.entity';
import { jwtGuards } from './../Roles/jwt.guards';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request , UseInterceptors , UploadedFile, Put,} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { dtoId } from 'src/Dto/dto.user';
import { eventDto } from 'src/Dto/dto.event';
import { Admin } from 'typeorm';
import { Role } from 'src/Roles/roles.auth';
import { Roles } from 'src/decorators/roles.decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';







@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService, readonly UserService:UserService) {}
  

@UseGuards(jwtGuards)
@Post('create')
async createEvent(@Body() createEventDto: CreateEventDto, @Request() req) {
  console.log(req.user);
  return this.eventService.create(createEventDto, req.user);

}

@UseGuards(jwtGuards)
@Post('upload-event-profile-picture')
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads/profile-pictures', 
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const fileName = `${req.params.id}-${Date.now()}${ext}`;
      cb(null, fileName);
    }
  }),
  fileFilter: (req, file, cb) => {

    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}))
async uploadProfilePicture(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
  const profilePictureUrl = `/uploads/profile-pictures/${file.filename}`;
  await this.eventService.updateProfilePicture(id, profilePictureUrl);
  return {
    message: 'Profile picture uploaded successfully!',
    url: profilePictureUrl,
  };
}
@UseGuards(jwtGuards)
@Post('upload-event-cover-picture')
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads/profile-pictures', 
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const fileName = `${req.params.id}-${Date.now()}${ext}`;
      cb(null, fileName);
    }
  }),
  fileFilter: (req, file, cb) => {

    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}))
async uploadCoverPhoto(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
  const profilePictureUrl = `/uploads/profile-pictures/${file.filename}`;
  await this.eventService.updateProfilePicture(id, profilePictureUrl);
  return {
    message: 'Profile picture uploaded successfully!',
    url: profilePictureUrl,
  };
}
@Get(':id/events/photo')
async getProfile(@Param('id') id:number) {
  return this.eventService.getEventPhoto(id);
}

  @Get("get/all/event")
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id/one/event')
  findOne(@Param() {id}:eventDto) {
    return this.eventService.findOne(id);
  }

  @Patch(':id/update/event')
  update(@Param(){id}:eventDto, @Body() updateEventDto: UpdateEventDto, ) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id/delete/event')
  remove(@Param() {id}:eventDto) {
    return this.eventService.remove(id);

    
  }
}
