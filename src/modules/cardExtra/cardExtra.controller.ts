import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/user.enum";
import { CardExtraService } from "./cardExtra.service";
import { CardExtraDto } from "./cardExtra.dto";
import { CardExtraTable } from "./cardExtra.entity";
import { Request } from 'express'
import { FilterQuery } from "src/shared/dtos/query.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('CardExtra')
@UseGuards(AuthGuard)
@Roles(Role.ADMIN,Role.USER)
@Controller('card-extra')
export class CardExtraController{

    constructor(
        private readonly cardExtraService:CardExtraService
    ){}

    @Post()
    async createCardExtra(
        @Body() cardExtra:CardExtraDto,
        @Req() request: Request
    ):Promise<CardExtraTable>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.cardExtraService.createCardExtra(cardExtra,authenticatedUserId)
    }

    @Get()
    async findCardExtra(
        @Query() cardExtra: FilterQuery,
    ):Promise<{
        data:CardExtraTable[],
        count:number
    }>{
        return await this.cardExtraService.findCardExtra(cardExtra)
    }

    @Get(':id')
    async findCardExtraById(
        @Param('id') id:number
    ):Promise<CardExtraTable>{
        return await this.cardExtraService.fincCardExtraById(id)
    }

    @Get('event/:id')
    async findCardExtraByIdEvent(
        @Param('id') id:number
    ):Promise<CardExtraTable[]>{
        return await this.cardExtraService.fincCardExtraByIdEvent(id)
    }

    @Delete(':id')
    async deleteCardExtra(
        @Param('id') id:number
    ):Promise<boolean>{
        return await this.cardExtraService.deleteCardExtra(id)
    }

    @Patch(':id')
    async updateClue(
        @Param('id') id:number,
        @Body() cardExtra:CardExtraDto,
        @Req() request: Request
    ):Promise<CardExtraTable>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.cardExtraService.updateCardExtra(id, cardExtra,authenticatedUserId)
    }

}