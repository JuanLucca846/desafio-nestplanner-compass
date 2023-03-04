import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop()
  locationName: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop()
  createdAt: Date = new Date();
}

export const EventSchema = SchemaFactory.createForClass(Location);
