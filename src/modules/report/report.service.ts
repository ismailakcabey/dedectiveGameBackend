import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { EventTable } from "../event/event.entity";
import { UserTable } from "../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ClueTable } from "../clue/clue.entity";
import { CardExtraTable } from "../cardExtra/cardExtra.entity";
import { MessageTable } from "../message/message.entity";
import { ExpressionTable } from "../expression/expression.entity";

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(EventTable) private readonly eventRepository: Repository<EventTable>,
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>,
        @InjectRepository(ClueTable) private readonly clueRepository: Repository<ClueTable>,
        @InjectRepository(CardExtraTable) private readonly cardRepository: Repository<CardExtraTable>,
        @InjectRepository(MessageTable) private readonly messageRepository: Repository<MessageTable>,
        @InjectRepository(ExpressionTable) private readonly expressionRepository: Repository<ExpressionTable>,
    ){}

        async createReport(eventId:number){
            const event = await this.eventRepository.findOne({where:{id:eventId}})
            const message = await this.messageRepository.find({where:{event:event}})
            const clue = await this.clueRepository.find({where:{event:event}})
            const expression = await this.expressionRepository.find({where:{event:event}})
            const cardExtra = await this.cardRepository.find({where:{event:event}})
            return {
                event: event,
                message:message,
                clue:clue,
                expression:expression,
                cardExtra:cardExtra
            }
        }

}