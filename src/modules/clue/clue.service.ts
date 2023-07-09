import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IClueService } from "./clue.interface";
import { FilterQuery, QueryDto } from "src/shared/dtos/query.dto";
import { ClueDto } from "./clue.dto";
import { ClueTable } from "./clue.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";

@Injectable()
export class ClueService implements IClueService {

    constructor(
        @InjectRepository(ClueTable) private readonly clueRepository: Repository<ClueTable>,
        private readonly saveImager:SaveImageMemoryService
    ){}

    async createClue(clue: ClueDto,authenticatedUserId:string): Promise<ClueTable> {
        const newClue = await this.clueRepository.create(clue)
        newClue.createdAt = new Date()
        newClue.createdUser = parseInt(authenticatedUserId)
        const filePath = await this.saveImager.imageSaver(clue.imageBase64,newClue.name)
        newClue.imageUrl = filePath
        console.log(newClue)
        return await this.clueRepository.save(newClue)
    }

    async findClue(query: FilterQuery): Promise<{ data: ClueTable[]; count: number; }> {
        try {
            console.log(JSON.parse(query.query))
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

    findClueById(id: number): Promise<ClueTable> {
        const clue = this.clueRepository.findOne({where:{id:id}})
        if(clue) return clue
        else throw new NotFoundException("Clue not found")
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
        const clueData = await this.clueRepository.findOne({where:{id:id}})
        if(clueData){
            Object.assign(clueData, clue)
            clueData.updatedAt = new Date()
            clueData.updatedUser = parseInt(authenticatedUserId)
            if(clueData.updatedUser != clueData.createdUser) throw new UnauthorizedException("this user is unauthorized in this game ")
            return await this.clueRepository.save(clueData)
        }
        else throw new NotFoundException("Clue not found")
    }
}