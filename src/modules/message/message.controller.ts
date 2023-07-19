import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/user.enum";
import { MessageService } from "./message.service";
import { MessageDto } from "./message.dto";
import { Request } from "express";
import { MessageTable } from "./message.entity";
import { FilterQuery } from "src/shared/dtos/query.dto";

@UseGuards(AuthGuard)
@Roles(Role.ADMIN,Role.USER)
@Controller('message')
export class MessageController{

    constructor(
        private readonly messageService: MessageService
    ){}

    @Post()
    async createMessage(
        @Body() message: MessageDto,
        @Req() request: Request
    ):Promise<MessageTable>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.messageService.createMessage(message, authenticatedUserId)
    }

    @Get()
    async findMessage(
        @Query() message:FilterQuery
    ):Promise<{
        data:MessageTable[],
        count:number
    }>{
        return await this.messageService.findMessage(message)
    }

    @Get(':id')
    async findMessageById(
        @Param('id') id:number
    ):Promise<MessageTable>{
        return await this.messageService.findMessageById(id)
    }

    @Get('event/:id')
    async findMessageByIdEvent(
        @Param('id') id:number
    ):Promise<MessageTable[]>{
        return await this.messageService.findMessageByIdEvent(id)
    }

    @Delete(':id')
    async deleteMessageById(
        @Param('id') id:number
    ):Promise<boolean>{
        return await this.messageService.deleteMessage(id)
    }

    @Patch(':id')
    async updateMessage(
        @Param('id') id:number,
        @Body() message:MessageDto,
        @Req() request: Request
    ):Promise<MessageTable>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.messageService.updateMessage(id,message,authenticatedUserId)
    }

}