import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../typeorm/Post";
import { Profile } from "../typeorm/Profile";
import { User } from "../typeorm/User";
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from "../utils/types";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {
  }

  findUsers() {
    return this.userRepository.find({ relations: ["profile", "posts"] });
  }


  findUser(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ["profile", "posts"]
    });
  }


  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date()
    });
    return this.userRepository.save(newUser);
  }


  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }


  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }


  async createUserProfile(id: number, createUserProfileDetails: CreateUserProfileParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("User not found. Cannot create Profile");
    }

    const newProfile = this.profileRepository.create(createUserProfileDetails);
    user.profile = await this.profileRepository.save(newProfile);
    return this.userRepository.save(user);
  }


  async createUserPost(id: number, createUserPostDetails: CreateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("User not found. Cannot create Profile");
    }

    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user
    });
    return this.postRepository.save(newPost);
  }

}
