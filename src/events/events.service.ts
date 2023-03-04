import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventDto } from './dto/event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model } from 'mongoose';
import { Event, EventDocument } from './entities/event.entity';
import { User } from '../users/entities/user.entity';
import { FindEventsQueryDto } from './dto/findEventsQuery.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: EventDto, user: User) {
    createEventDto.userId = user._id;
    const event = new this.eventModel(createEventDto);
    return await event.save();
  }

  async findAll(user: User, { offset, limit }: FindEventsQueryDto) {
    const offsetInt = parseInt(offset);
    const limitInt = parseInt(limit);

    const total = await this.eventModel.count({ userId: user._id });

    const items = await this.eventModel
      .find({ userId: user._id })
      .skip(limitInt * offsetInt)
      .limit(limitInt);

    return {
      limit: limitInt,
      offset: offsetInt,
      total,
      items,
    };
  }

  async findOne(id: string, user: User) {
    return this.eventModel.find({ _id: id, userId: user._id });
  }

  async update(id: string, updateEventDto: UpdateEventDto, user: User) {
    const event = await this.eventModel.findOne({ _id: id, userId: user._id });
    if (!event) {
      throw new NotFoundException('not found');
    }
    console.log(updateEventDto);
    event.description = updateEventDto.description;
    event.dateTime = updateEventDto.dateTime;
    event.location = updateEventDto.location;
    return event.save();
  }

  async remove(id: string, user: User) {
    return await this.eventModel
      .deleteOne({ _id: id, userId: user._id })
      .exec();
  }
}
