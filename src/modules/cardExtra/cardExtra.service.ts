import { Injectable, NotFoundException } from "@nestjs/common";
import { ICardExtraInterface } from "./cardExtra.interface";
import { FilterQuery, QueryDto } from "src/shared/dtos/query.dto";
import { CardExtraDto } from "./cardExtra.dto";
import { CardExtraTable } from "./cardExtra.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { UnAuthGameUpdate } from "src/shared/exception/unAtuhGameUpdate.exception";
import { UserTable } from "../user/user.entity";
import { EventService } from "../event/event.service";

@Injectable()
export class CardExtraService implements ICardExtraInterface{

    constructor(
        @InjectRepository(CardExtraTable) private readonly cardExtraRepository: Repository<CardExtraTable>,
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>,
        private readonly eventService: EventService
    ){}

    async createCardExtra(cardExtra: CardExtraDto, authenticatedUserId: string): Promise<CardExtraTable> {
        try {
            const newCardExtra = await this.cardExtraRepository.create(cardExtra);
        const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
        newCardExtra.createdUser = user
        newCardExtra.createdAt = new Date()
        return await this.cardExtraRepository.save(newCardExtra)
        } catch (error) {
            return error
        }
    }

    async findCardExtra(query: FilterQuery): Promise<{ data: CardExtraTable[]; count: number; }> {
        try {
            const filter : QueryDto = JSON.parse(query.query)
            const [cardExtra,count] = await this.cardExtraRepository.findAndCount(filter as FindManyOptions<CardExtraTable>)
            return{
                data: cardExtra,
                count: count
            }
        } catch (error) {
            throw new Error("Geçerli Bir Sorgu Girin")
        }
    }

    async fincCardExtraById(id: number): Promise<CardExtraTable> {
        const cardExtra = await this.cardExtraRepository.findOne({where: {id: id}})
        if(cardExtra == null){
            throw new NotFoundException("CardExtra not found")
        }
        else{
            return cardExtra
        }
    }

    async fincCardExtraByIdEvent(id: number): Promise<CardExtraTable[]> {
        const event = await this.eventService.findEventById(id)
        const cardExtra = await this.cardExtraRepository.find({where: {event: event}})
        return cardExtra
    }

    async deleteCardExtra(id: number): Promise<boolean> {
        const cardExtra = await this.cardExtraRepository.findOne({where: {id: id}})
        if(cardExtra == null){
            throw new NotFoundException("CardExtra not found")
        }
        else{
            await this.cardExtraRepository.delete(id)
            return true
        }
    }

    async updateCardExtra(id: number, cardExtra: CardExtraDto, authenticatedUserId: string): Promise<CardExtraTable> {
        const cardExtraData = await this.cardExtraRepository.findOne({where: {id: id},relations:["createdUser","updatedUser"] })
        if(cardExtra == null){
            throw new NotFoundException("CardExtra not found")
        }
        else{
            Object.assign(cardExtraData, cardExtra)
            cardExtraData.updatedAt = new Date()
            const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
            cardExtraData.updatedUser = user
            if(cardExtraData.updatedUser.id != cardExtraData.createdUser.id) throw new UnAuthGameUpdate("this user is unauthorized in this game ")
            return await this.cardExtraRepository.save(cardExtraData)
        }
    }

}