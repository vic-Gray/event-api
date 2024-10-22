import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]  // make service available to other modules  // to use UserService in other modules, you need to import UserModule and inject UserService in the module where you want to use it.  //  import { UserService } from './user.service';  //  providers: [UserService]  //  exports: [UserService]   //  UserModule  //  @Module({ imports: [UserModule] })  //  export class AppModule {}  //
})
export class UserModule {}
