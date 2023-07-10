import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/user.enum";
import { ClueService } from "./clue.service";
import { ClueDto } from "./clue.dto";
import { ClueTable } from "./clue.entity";
import { FilterQuery } from "src/shared/dtos/query.dto";
import { Request } from 'express'
@UseGuards(AuthGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('clue')
export class ClueController{
    
    constructor(
        private readonly clueService:ClueService
    ){}

    @Post()
    async createClue(
        @Body() clue: ClueDto,
        @Req() request: Request
    ):Promise<ClueTable>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.clueService.createClue(clue,authenticatedUserId)
    }

    @Get()
    async findClue(
        @Query() clue: FilterQuery,
    ):Promise<{
        data:ClueTable[],
        count:number
    }>{
        return await this.clueService.findClue(clue)
    }

    @Get(':id')
    async findClueById(
        @Param('id') id:number
    ):Promise<ClueTable>{
        return await this.clueService.findClueById(id)
    }

    @Delete(':id')
    async deleteClue(
        @Param('id') id:number
    ):Promise<boolean>{
        return await this.clueService.deleteClue(id)
    }

    @Patch(':id')
    async updateClue(
        @Param('id') id:number,
        @Body() clue:ClueDto,
        @Req() request: Request
    ):Promise<ClueTable>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.clueService.updateClue(id, clue,authenticatedUserId)
    }
    
}