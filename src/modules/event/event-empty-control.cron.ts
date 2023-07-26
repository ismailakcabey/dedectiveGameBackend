import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { EventTable } from './event.entity';
import { Repository } from 'typeorm';

export class EventEmptyControlCron{
    constructor(
        @InjectRepository(EventTable) private readonly eventRepository: Repository<EventTable>
    ){}

    @Cron(CronExpression.EVERY_10_MINUTES)
    async handleCron(){
        Logger.log("Empty Cron Job Started")
        const result = await this.eventRepository.find({where:{name:''}})
        for(let i = 0; i < result.length; i++){
            await this.eventRepository.delete(result[i].id)
        }
        Logger.log("Empty Cron Job Finished")
    }
}