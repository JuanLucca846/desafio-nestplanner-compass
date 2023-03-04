import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Location } from './location.entity';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  description: string;

  @Prop()
  userId: string;

  @Prop()
  dateTime: Date;

  @Prop()
  location: Location;

  @Prop()
  createdAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
