import { Injectable, NotFoundException } from "@nestjs/common";
import { IExpressionService } from "./expression.interface";
import { FilterQuery, QueryDto } from "src/shared/dtos/query.dto";
import { ExpressionDto } from "./expression.dto";
import { ExpressionTable } from "./expression.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";


@Injectable()

export class ExpressionService implements IExpressionService{

    constructor(
        @InjectRepository(ExpressionTable) private readonly expressionRepository:Repository<ExpressionTable>,
        private readonly saveImager:SaveImageMemoryService
    ){}

    async createExpression(expression: ExpressionDto): Promise<ExpressionTable> {
        const newExpression = await this.expressionRepository.create(expression)
        newExpression.createdAt = new Date()
        const filePath = await this.saveImager.imageSaver(expression.imageBase64,newExpression.personName)
        newExpression.imageUrl= filePath
        return await this.expressionRepository.save(newExpression)
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

    findExpressionById(id: number): Promise<ExpressionTable> {
        const expression = this.expressionRepository.findOne({where:{id:id}})
        if(expression) return expression
        else throw new NotFoundException("Expression not found")
    }

    async deleteExpression(id: number): Promise<boolean> {
        const expression = this.expressionRepository.findOne({where:{id:id}})
        if(expression){
            await this.expressionRepository.delete(id)
            return true
        }
        else throw new NotFoundException("Expression not found")
    }

    async updateExpression(id: number, expression: ExpressionDto): Promise<ExpressionTable> {
        const expressionData = await this.expressionRepository.findOne({where:{id:id}})
        if(expressionData){
            Object.assign(expressionData, expression)
            expressionData.updatedAt = new Date()
            return await this.expressionRepository.save(expressionData)
        }
        else throw new NotFoundException("Expression not found")
    }

}