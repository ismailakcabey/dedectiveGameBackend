import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IExpressionService } from "./expression.interface";
import { FilterQuery, QueryDto } from "src/shared/dtos/query.dto";
import { ExpressionDto } from "./expression.dto";
import { ExpressionTable } from "./expression.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { UnAuthGameUpdate } from "src/shared/exception/unAtuhGameUpdate.exception";
import { UserTable } from "../user/user.entity";


@Injectable()

export class ExpressionService implements IExpressionService{

    constructor(
        @InjectRepository(ExpressionTable) private readonly expressionRepository:Repository<ExpressionTable>,
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>,
        private readonly saveImager:SaveImageMemoryService
    ){}

    async createExpression(expression: ExpressionDto,authenticatedUserId:string): Promise<ExpressionTable> {
        try {
            const newExpression = await this.expressionRepository.create(expression)
        newExpression.createdAt = new Date()
        const filePath = await this.saveImager.imageSaver(expression.imageBase64,newExpression.personName)
        newExpression.imageUrl= filePath
        const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
        newExpression.createdUser = user
        return await this.expressionRepository.save(newExpression)
        } catch (error) {
            return error
        }
    }

    async findExpression(query: FilterQuery): Promise<{ data: ExpressionTable[]; count: number; }> {
        try {
            const filter : QueryDto = JSON.parse(query.query)
            const [expression, count] = await this.expressionRepository.findAndCount(filter as FindManyOptions<ExpressionTable>)
            return{
                data: expression,
                count: count
            }
        } catch (error) {
            throw new Error("Geçerli Bir Sorgu Girin")
        }
    }

    async findExpressionById(id: number): Promise<ExpressionTable> {
        const expression = await this.expressionRepository.findOne({where:{id:id}})
        console.log("burada")
        if(expression == null){
            throw new NotFoundException("Expression not found")
        }else{
        return expression
        }
        
    }

    async deleteExpression(id: number): Promise<boolean> {
        const expression = this.expressionRepository.findOne({where:{id:id}})
        if(expression){
            await this.expressionRepository.delete(id)
            return true
        }
        else throw new NotFoundException("Expression not found")
    }

    async updateExpression(id: number, expression: ExpressionDto,authenticatedUserId:string): Promise<ExpressionTable> {
        const expressionData = await this.expressionRepository.findOne({where:{id:id},relations:["createdUser","updatedUser"] })
        if(expressionData){
            Object.assign(expressionData, expression)
            expressionData.updatedAt = new Date()
            const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
            expressionData.updatedUser = user
            if(expressionData.createdUser.id != expressionData.updatedUser.id) throw new UnAuthGameUpdate("this user is unauthorized in this game ")
            return await this.expressionRepository.save(expressionData)
        }
        else throw new NotFoundException("Expression not found")
    }

}