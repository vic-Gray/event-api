import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UnauthorizedException, UseInterceptors, UploadedFile, UseGuards,Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { dtoId } from 'src/Dto/dto.user';
import { User } from './entities/user.entity';
import { logInDto } from 'src/Dto/logIn.dto';
import path, { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { UserGuards } from 'src/Roles/userguard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  validateUSer(@Body() loginDto:logInDto ){
    console.log(loginDto);
    
    return this.userService.validateUser( loginDto)
  }
  
  @UseGuards(UserGuards)
  @Post('upload-picture')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const fileBase64 = file.buffer.toString('base64');  // Convert file buffer to base64
    return this.userService.saveOrUpdatePicture(body.id, fileBase64);
  }

  @Put('update-picture')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  updateProfilePicture(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const fileBase64 = file.buffer.toString('base64');  // Convert file buffer to base64
    return this.userService.saveOrUpdatePicture(body.userId, fileBase64);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() {id}: dtoId) {
    return this.userService.findOne(id);
  }

  @Patch(':id/update')
  update(@Param() {id}:dtoId, @Body() updateUserDto: UpdateUserDto, CreateUserDto:CreateUserDto) {
    return this.userService.update(id, updateUserDto,);
  }
  
  @Delete(':id')
  remove(@Param() {id}: dtoId, ) {
    return this.userService.remove(id);
  }

  @Get('name/:name')
  async searchUserByName(@Param('name') name: string): Promise<User[]> {
    const existingUsers = await this.userService.searchUserByName(name);
    
    if (existingUsers.length === 0) {
      throw new UnauthorizedException('No users found with this name');
    }

    return existingUsers; // Return the list of users found
  }
}

