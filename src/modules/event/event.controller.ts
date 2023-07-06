import { Body, Controller, Post, Query, UseGuards, Get, Param, Patch, Delete } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventDto } from "./event.dto";
import { EventTable } from "./event.entity";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/user.enum";
import { FilterQuery } from "src/shared/dtos/query.dto";


@UseGuards(AuthGuard)
@Roles(Role.ADMIN,Role.USER)
@Controller('event')
export class EventController{

    constructor(
        private readonly eventService: EventService
    ){}

    @Post()
    async createEvent(
        @Body() event: EventDto
    ):Promise<EventTable>{
        return this.eventService.createEvent(event)
    }

    @Get()
    async findEvent(
        @Query() event: FilterQuery
    ):Promise<{
        data:EventTable[],
        count:number
    }>{
        return this.eventService.findEvent(event)
    }

    @Get(':id')
    async findEventById(
        @Param('id') id: number
    ): Promise<EventTable>{
        return this.eventService.findEventById(id)
    }

    @Patch(':id')
    async updateEventById(
        @Param('id') id: number,
        @Body() event: EventDto
    ): Promise<EventTable>{
        return this.eventService.updateEvent(event, id)
    }

    @Delete(':id')
    async deleteEventById(
        @Param('id') id: number
    ): Promise<boolean>{
        return this.eventService.deleteEvent(id)
    }


}