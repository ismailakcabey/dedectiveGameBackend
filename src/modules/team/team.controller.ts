import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/user.enum";
import { TeamService } from "./team.service";
import { Request } from 'express'
import { TeamDto } from "./team.dto";
import { TeamTable } from "./team.entity";
import { FilterQuery } from "src/shared/dtos/query.dto";
@UseGuards(AuthGuard)
@Roles(Role.ADMIN,Role.USER)
@Controller('team')
export class TeamController{

    constructor(
        private readonly teamService: TeamService
    ){}

    @Post()
    async createTeam(
        @Body() team: TeamDto,
        @Req() request: Request
    ):Promise<TeamTable>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.teamService.createTeam(team, authenticatedUserId)
    }

    @Post('join/:id')
    async joinTeam(
        @Param('id') id:number,
        @Req() request: Request
    ):Promise<boolean>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.teamService.joinTeam(authenticatedUserId,id)
    }

    @Get()
    async findTeam(
        @Query() team: FilterQuery
    ):Promise<{
        data:TeamTable[],
        count: number
    }> {
        return await this.teamService.findTeam(team)
    }

    @Get('teams/in/user')
    async findTeamInUser(
        @Req() request: Request
    ):Promise<TeamTable[]> {
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.teamService.inUserTeams(authenticatedUserId)
    }

    @Get('/excel/export')
    async findTeamExcel(
        @Query() team: FilterQuery,
        @Req() request: Request
    ):Promise<string> {
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.teamService.excelTeam(team, authenticatedUserId)
    }

    @Delete(':id')
    async deleteTeam(
        @Param('id') id:number
    ):Promise<boolean>{
        return await this.teamService.deleteTeam(id)
    }

    @Patch(':id')
    async updateTeam(
        @Param('id') id:number,
        @Body() team:TeamDto,
        @Req() request: Request
    ):Promise<TeamTable>{
        //@ts-ignore
        const authenticatedUserId = request?.user?.id
        return await this.teamService.updateTeam(id,team,authenticatedUserId)
    }

}