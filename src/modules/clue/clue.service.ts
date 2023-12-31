import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IClueService } from "./clue.interface";
import { FilterQuery, QueryDto } from "src/shared/dtos/query.dto";
import { ClueDto } from "./clue.dto";
import { ClueTable } from "./clue.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { UnAuthGameUpdate } from "src/shared/exception/unAtuhGameUpdate.exception";
import { UserTable } from "../user/user.entity";
import { EventService } from "../event/event.service";

@Injectable()
export class ClueService implements IClueService {

    constructor(
        @InjectRepository(ClueTable) private readonly clueRepository: Repository<ClueTable>,
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>,
        private readonly eventService: EventService,
        private readonly saveImager:SaveImageMemoryService
    ){}

    async createClue(clue: ClueDto,authenticatedUserId:string): Promise<ClueTable> {
        try {
            const newClue = await this.clueRepository.create(clue)
        newClue.createdAt = new Date()
        const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
        newClue.createdUser = user
        const filePath = await this.saveImager.imageSaver(clue.imageBase64,newClue.name)
        newClue.imageUrl = filePath
        return await this.clueRepository.save(newClue)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async findClue(query: FilterQuery): Promise<{ data: ClueTable[]; count: number; }> {
        try {
            const filter : QueryDto = JSON.parse(query.query)
            const [clue, count] = await this.clueRepository.findAndCount(filter as FindManyOptions<ClueTable>)
            return{
                data: clue,
                count: count
            }
        } catch (error) {
            throw new Error("Geçerli Bir Sorgu Girin")
        }
    }

    async findClueById(id: number): Promise<ClueTable> {
        const clue = await this.clueRepository.findOne({where:{id:id}})
        if(clue == null){
            throw new NotFoundException("Clue not found")
        } 
        else {
            return clue
        }
    }

    async findClueByIdEvent(id: number): Promise<ClueTable[]> {
        const event = await this.eventService.findEventById(id)
        const clue = await this.clueRepository.find({where:{event:event}})
        if(clue == null){
            throw new NotFoundException("Clue not found")
        } 
        else {
            return clue
        }
    }

    async deleteClue(id: number): Promise<boolean> {
        const clue = this.clueRepository.findOne({where:{id:id}})
        if(clue){
            await this.clueRepository.delete(id)
            return true
        }
        else throw new NotFoundException("Clue not found")
    }

    async updateClue(id: number, clue: ClueDto,authenticatedUserId:string): Promise<ClueTable> {
        const clueData = await this.clueRepository.findOne({where:{id:id},relations:["createdUser","updatedUser"] })
        if(clueData){
            Object.assign(clueData, clue)
            clueData.updatedAt = new Date()
            const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
            clueData.updatedUser = user
            if(clueData.updatedUser.id != clueData.createdUser.id) throw new UnAuthGameUpdate("this user is unauthorized in this game ")
            return await this.clueRepository.save(clueData)
        }
        else throw new NotFoundException("Clue not found")
    }
}