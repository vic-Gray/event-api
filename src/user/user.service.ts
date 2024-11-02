I'm
import { BadRequestException, Injectable, UnauthorizedException, Patch, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { ifError } from 'assert';
import { Role } from 'src/Roles/roles.auth';
import { logInDto } from 'src/Dto/logIn.dto';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';

 
@Injectable()
export class UserService {
  private s3: AWS.S3
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>, private readonly JwtService:JwtService, 

  ){
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
  }


  
  async create({name,password,email,phone, userName,role}: CreateUserDto) {
      const userEmail =  await this.userRepository.findOneBy({email})
      const userPhone = await this. userRepository.findOneBy({phone})
     
      if (userEmail) {
         throw new UnauthorizedException("sorry email is already in use")
      }
      if (userPhone) {
        
        throw new UnauthorizedException("sorry phone is already in use")
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      
     const newUser = this.userRepository.create({
      name,
      email,
      password:hashedPassword,
      phone,
        userName,
        role
     })

     await this.userRepository.save(newUser)
   return newUser

  }

  async validateUser({ email, password }: logInDto) {
   
    try{
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
          throw new UnauthorizedException("Wrong credentials");
      }
      
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new UnauthorizedException("Wrong password, please try again");
         
    }  return this.logIn(user)
     }catch(error){
      return null
     }
   
    

    }



    async updateProfilePicture(id: number, profilePictureUrl: string): Promise<User> {
      const user = await this.userRepository.findOne({ where: { id } });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      user.profilePicture = profilePictureUrl;  
      return this.userRepository.save(user); 
    }
  
    // Other user-related service methods...
  

async logIn(user: any) {
  
    const payLoad = {
        sub: user.id,
        email: user.email,
        role: user.role,
        username: user.userName, 
        phone: user.phone,
        name:user.name
    };
  
    return this.JwtService.sign(payLoad);
}



   async findAll() {
    const allUSers = await this.userRepository.find()
    return allUSers
  }

   async findOne (id:number){
       

    const oneUSer = await this.userRepository.findOneBy({id})

    if (!oneUSer) {
      throw new UnauthorizedException("sorry the user with this id was not found")
    }
 

    return (
      oneUSer.email
    )
   }

   async update(id: number, updateUserDto: UpdateUserDto, ) {

    // Find the user by ID
    const existingUser = await this.userRepository.findOneBy({ id });

    // Check if the user exists
    if (!existingUser) {
      throw new UnauthorizedException(`sorry the user with the id #${id} was not found`);
    }

  
    // Merge the existing user with the updateUserDto
    const newUpdatedUser = this.userRepository.merge(existingUser, updateUserDto);
  
    // Save the merged entity to the database
    const updatedUSer = await this.userRepository.save(newUpdatedUser)
    return{
      message:`dear ${existingUser.name} your profile has been updated succesfully preview your update from your profile`
    }
     
  
   }
    async remove(id: number ) {
      
      const userId = await this.userRepository.findOneBy({id})
       if (!userId) {
        throw new UnauthorizedException("Sorry, the user with this ID cannot be updated.");
       }

       const deletedUser = await this.userRepository.delete({id})
        console.log(deletedUser);
        
       return {
       message:'your account has been deleted succesfully'}
       

  }
 async findByEmail({email}:  CreateUserDto){
  return this.userRepository.findOneBy({email})
 }
  
  async searchUserByName(name: string): Promise<User[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.name ILIKE :name', { name: `%${name}%` }) // Use ILIKE for case-insensitive search
      .getMany();

    return (
      users
    ) 
  }

}



