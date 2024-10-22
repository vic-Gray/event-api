import { Injectable, BadRequestException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs'; // Only if you're using RxJS elsewhere

@Injectable()
export class UserGuards extends AuthGuard('jwt') {

  handleRequest(err: any, user: any, info: any) {
    const allowedRoles = ['USER', 'ADMIN', 'EDITOR'];

    // If there is an error or no user, throw an exception
    if (err || !user) {
      console.log('Error or no user found:', err || info);
      throw new BadRequestException('Authentication failed. Please log in again.');
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(user.role)) {
      console.log(`User ${user.user.name} has an unauthorized role: ${user.role}`);
      throw new BadRequestException(`${user.name}, you are not authorized to access this resource.`);
    }

    // Log the user info (optional, for debugging purposes)
    console.log(`Authenticated user: ${user.user.name}, Role: ${user.user.role}`);

    return user; // Return user if everything is okay
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Call the base class canActivate method and ensure it returns boolean or Promise<boolean>
    return super.canActivate(context) as Promise<boolean>;
  }
}
