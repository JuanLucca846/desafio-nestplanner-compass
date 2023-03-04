import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: Date;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  constructor(user?: Partial<UserDocument>) {
    this._id = user?.id;
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.birthDate = user?.birthDate;
    this.city = user?.city;
    this.country = user?.country;
    this.email = user?.email;
    this.password = user?.password;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
