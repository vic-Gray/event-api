import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Role } from 'src/Roles/roles.auth';

export class CreateEventDto {
  @ApiProperty({
    example: 'Tech Conference 2025',
    description: 'The name of the event',
  })
  @IsNotEmpty({ message: 'Sorry, eventName cannot be empty' })
  readonly eventName: string;

  @ApiProperty({
    example: 'A conference bringing together tech enthusiasts',
    description: 'Brief description of the event',
  })
  @IsNotEmpty({ message: 'Sorry, description cannot be empty' })
  readonly description: string;

  @ApiProperty({
    example: 'conference',
    description: 'Type of the event (e.g., seminar, conference, workshop)',
  })
  @IsNotEmpty({ message: 'Sorry, eventType cannot be empty' })
  readonly eventType: string;

  @ApiProperty({
    example: 'Lagos, Nigeria',
    description: 'Location where the event will be held',
  })
  @IsString()
  location: string;

  @ApiProperty({
    example: 5000,
    description: 'Price of a single ticket for the event',
  })
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'organizer',
    enum: Role,
    description: 'Role of the person creating the event',
  })
  @IsNotEmpty({ message: 'Sorry, role cannot be empty' })
  readonly role: Role;

  @ApiProperty({
    example: 200,
    description: 'Total number of tickets available for the event',
  })
  numberOfTicket: number;

  @ApiProperty({
    example: 'event-organizer@example.com',
    description: 'Contact email of the event organizer',
  })
  @IsEmail()
  email: string;
}
