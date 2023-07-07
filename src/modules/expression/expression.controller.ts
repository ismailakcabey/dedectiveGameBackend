import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Role } from "../user/user.enum";
import { Roles } from "../auth/roles.decorator";
import { ExpressionService } from "./expression.service";
import { ExpressionDto } from "./expression.dto";
import { ExpressionTable } from "./expression.entity";
import { FilterQuery } from "src/shared/dtos/query.dto";

@UseGuards(AuthGuard)
@Roles(Role.ADMIN,Role.USER)
@Controller('expression')
export class ExpressionController{

    constructor(
        private readonly expressionService:ExpressionService
    ){}

    @Post()
    async createExpression(
        @Body() expression:ExpressionDto
    ):Promise<ExpressionTable>{
        return await this.expressionService.createExpression(expression)
    }

    @Get()
    async findExpression(
        @Query() expression:FilterQuery
    ):Promise<{
        data:ExpressionTable[],
        count:number
    }>{
        return await this.expressionService.findExpression(expression)
    }

    @Get(':id')
    async findExpressionsById(
        @Param('id') id:number
    ):Promise<ExpressionTable>{
        return await this.expressionService.findExpressionById(id)
    }

    @Delete(':id')
    async deleteExpression(
        @Param('id') id:number
    ):Promise<boolean>{
        return await this.expressionService.deleteExpression(id)
    }

    @Patch(':id')
    async updateExpression(
        @Param('id') id:number,
        @Body() expression:ExpressionDto
    ):Promise<ExpressionTable>{
        return await this.expressionService.updateExpression(id, expression)
    }

}