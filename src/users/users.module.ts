import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../typeorm/Post";
import { Profile } from "../typeorm/Profile";
import { User } from "../typeorm/User";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Post])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {
}
