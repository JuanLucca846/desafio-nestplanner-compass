import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FindEventsQueryDto } from './dto/findEventsQuery.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('/api/v1/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createEventDto: EventDto, @Request() { user }) {
    return this.eventsService.create(createEventDto, user);
  }

  @Get()
  @ApiBearerAuth()
  findAll(
    @Request() { user },
    @Query() findEventsQueryDto: FindEventsQueryDto,
  ) {
    return this.eventsService.findAll(user, findEventsQueryDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string, @Request() { user }) {
    return this.eventsService.findOne(id, user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() { user },
  ) {
    return this.eventsService.update(id, updateEventDto, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Request() { user }) {
    return this.eventsService.remove(id, user);
  }
}
