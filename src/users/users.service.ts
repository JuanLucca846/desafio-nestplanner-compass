import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { use } from 'passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { check } from 'prettier';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.userModel.findOne({ email: createUserDto.email })) {
      throw new ConflictException('User already exist');
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new ConflictException('Wrong Password!');
    }

    const userData = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    await new this.userModel(userData).save();

    return {
      ...userData,
      password: '',
      confirmPassword: '',
    };
  }

  async refreshToken(user: User) {
    const refresh = await this.userModel.findOne({ email: user.email });
    const jwtToken = this.jwtService.sign(refresh.toObject());

    return {
      token: jwtToken,
    };
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    const updateFields = {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      birthDate: updateUserDto.birthDate,
      city: updateUserDto.city,
      country: updateUserDto.country,
    };
    let user = await this.userModel.findOneAndUpdate(
      { email },
      updateFields,
      {},
    );

    user = user.toObject();
    user.password = '';

    const updateUser = await this.userModel.findOne({ email });
    updateUser.password = '';

    return updateUser;
  }

  async remove(id: string) {
    const checkUser = await this.userModel.findById({ _id: id });
    if (!checkUser) {
      throw new ConflictException('User not found');
    }

    return await this.userModel.deleteOne({ _id: id }).exec();
  }

  async updatePassword(email: string, updatePasswordDto: UpdatePasswordDto) {
    if (updatePasswordDto.password !== updatePasswordDto.confirmPassword) {
      throw new ConflictException('Wrong Password!');
    }
    const password = await bcrypt.hash(updatePasswordDto.password, 10);

    const updatePass = await this.userModel.findOneAndUpdate(
      { email: email },
      { $set: { password } },
    );

    updatePass.password = '';

    return updatePass;
  }
}
