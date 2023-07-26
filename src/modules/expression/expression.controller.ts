import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Role } from "../user/user.enum";
import { Roles } from "../auth/roles.decorator";
import { ExpressionService } from "./expression.service";
import { ExpressionDto } from "./expression.dto";
import { ExpressionTable } from "./expression.entity";
import { FilterQuery } from "src/shared/dtos/query.dto";
import { Request } from 'express'
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Expression')
@UseGuards(AuthGuard)
@Roles(Role.ADMIN,Role.USER)
@Controller('expression')
export class ExpressionController{

    constructor(
        private readonly expressionService:ExpressionService
    ){}

    @Post()
    async createExpression(
        @Body() expression:ExpressionDto,
        @Req() request: Request
    ):Promise<ExpressionTable>{
         //@ts-ignore
         const authenticatedUserId = request?.user?.id
        return await this.expressionService.createExpression(expression,authenticatedUserId)
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

    @Get('event/:id')
    async findExpressionsByIdEvent(
        @Param('id') id:number
    ):Promise<ExpressionTable[]>{
        return await this.expressionService.findExpressionByIdEvent(id)
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
        @Body() expression:ExpressionDto,
        @Req() request: Request
    ):Promise<ExpressionTable>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.expressionService.updateExpression(id, expression,authenticatedUserId)
    }

}