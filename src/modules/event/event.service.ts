import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IEventService } from "./event.interface";
import { FilterQuery, QueryDto } from "src/shared/dtos/query.dto";
import { EventDto } from "./event.dto";
import { EventTable } from "./event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { UnAuthGameUpdate } from "src/shared/exception/unAtuhGameUpdate.exception";
import { UserTable } from "../user/user.entity";

@Injectable()
export class EventService implements IEventService {

    constructor(
        @InjectRepository(EventTable) private readonly eventRepository: Repository<EventTable>,
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>,
        private readonly saveImager:SaveImageMemoryService
    ) { }

    async createEvent(event: EventDto,authenticatedUserId:string): Promise<EventTable> {
        try {
            const newEvent = await this.eventRepository.create(event);
        newEvent.createdAt = new Date
        const filePath = await this.saveImager.imageSaver(event.imageBase64, newEvent.name)
        newEvent.imageUrl = filePath;
        const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
        newEvent.createdUser = user
        return await this.eventRepository.save(newEvent);
        } catch (error) {
            return error
        }
    }

    async findEvent(query: FilterQuery): Promise<{ data: EventTable[]; count: number; }> {
        try {
            const filter: QueryDto = JSON.parse(query.query)
            const [event, count] = await this.eventRepository.findAndCount(filter as FindManyOptions<EventTable>)
            return {
                data: event,
                count: count
            }
        } catch (error) {
            throw new Error("Geçerli Bri Sorgu Girin.");
        }

    }

    async findEventById(id: number): Promise<EventTable> {
        const event = await this.eventRepository.findOne({ where: { id: id } })
        if (event) return event
        else throw new NotFoundException("No event found")
    }

    async updateEvent(event: EventDto, id: number,authenticatedUserId:string): Promise<EventTable> {
        const eventData = await this.eventRepository.findOne({ where: { id: id },relations:["createdUser","updatedUser"] })
        if (eventData) {
            Object.assign(eventData, event)
            eventData.updatedAt = new Date
            const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
            eventData.updatedUser = user
            if(eventData.updatedUser.id != eventData.createdUser.id) throw new UnAuthGameUpdate("this user is unauthorized in this game ")
            const newEvent = await this.eventRepository.save(eventData)
            return newEvent
        }
        else throw new NotFoundException("No event found")
    }

    async deleteEvent(id: number): Promise<boolean> {
        const eventData = await this.eventRepository.findOne({ where: { id: id } })
        if (eventData) {
            await this.eventRepository.delete(id)
            return true
        }
        else throw new NotFoundException("No event found")
    }

}