import { Injectable, NotFoundException } from "@nestjs/common";
import { IMessageService } from "./message.interface";
import { FilterQuery, QueryDto } from "src/shared/dtos/query.dto";
import { MessageDto } from "./message.dto";
import { MessageTable } from "./message.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { UnAuthGameUpdate } from "src/shared/exception/unAtuhGameUpdate.exception";
import { UserTable } from "../user/user.entity";

@Injectable()
export class MessageService implements IMessageService{
    
    constructor(
        @InjectRepository(MessageTable) private readonly messageRepository: Repository<MessageTable>,
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>,
    ){}

    async createMessage(message: MessageDto, authenticatedUserId: string): Promise<MessageTable> {
        const newMessage = await this.messageRepository.create(message);
        newMessage.createdAt = new Date()
        const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
        newMessage.createdUser = user
        return await this.messageRepository.save(newMessage);
    }

    async findMessage(query: FilterQuery): Promise<{ data: MessageTable[]; count: number; }> {
        try {
            const filter : QueryDto = JSON.parse(query.query)
            const [message, count] = await this.messageRepository.findAndCount(filter as FindManyOptions<MessageTable>)
            return{
                data: message,
                count: count
            }
        } catch (error) {
            throw new Error("Geçerli Bir Sorgu Girin")
        }
    }

    async findMessageById(id: number): Promise<MessageTable> {
        const message = await this.messageRepository.findOne({where:{id:id}})
        if(message == null){
            throw new NotFoundException("Message not found")
        }
        else{
            return message
        }
    }

    async deleteMessage(id: number): Promise<boolean> {
        const message = await this.messageRepository.findOne({where:{id:id}})
        if(message == null){
            throw new NotFoundException("Message not found")
        }
        else{
            await this.messageRepository.delete(id)
            return true
        }
    }

    async updateMessage(id: number, message: MessageDto, authenticatedUserId: string): Promise<MessageTable> {
        const messageData = await this.messageRepository.findOne({where:{id:id},loadRelationIds:true})
        if(message == null){
            throw new NotFoundException("Message not found")
        }
        else{
            Object.assign(messageData,message)
            const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
            messageData.updatedUser= user
            messageData.updatedAt = new Date()
            if(messageData.createdUser != messageData.updatedUser) throw new UnAuthGameUpdate("this user is unauthorized in this game ")
            return await this.messageRepository.save(messageData)
        }
    }
}