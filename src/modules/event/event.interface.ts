import { FilterQuery } from "src/shared/dtos/query.dto";
import { EventDto } from "./event.dto";
import { EventTable } from "./event.entity";

export interface IEventService{
    createEvent(event:EventDto):Promise<EventTable>;
    findEvent(query:FilterQuery):Promise<{
        data:EventTable[],
        count:number
    }>
    findEventById(id:number):Promise<EventTable>;
    updateEvent(event:EventDto,id:number):Promise<EventTable>
    deleteEvent(id:number):Promise<boolean>
}