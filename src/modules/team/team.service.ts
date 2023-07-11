import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ITeamService } from "./team.interface";
import { FilterQuery, QueryDto } from "src/shared/dtos/query.dto";
import { TeamDto } from "./team.dto";
import { TeamTable } from "./team.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SaveExcelMemoryService } from "src/shared/services/saveExcelToMemory.service";
import { RedisService } from "src/shared/services/redis.service";
import { UnAuthGameUpdate } from "src/shared/exception/unAtuhGameUpdate.exception";
import { UserTable } from "../user/user.entity";

@Injectable()
export class TeamService implements ITeamService {

    constructor(
        @InjectRepository(TeamTable) private readonly teamRepository:Repository<TeamTable>,
        @InjectRepository(UserTable) private readonly userRepository:Repository<UserTable>,
        private readonly saveExcelMemoryService:SaveExcelMemoryService,
        private readonly redisService:RedisService
    ){}

    async createTeam(team: TeamDto, authenticatedUserId: string): Promise<TeamTable> {
        try {
        const newTeam = await this.teamRepository.create(team)
        newTeam.createdAt = new Date()
        const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
        newTeam.createdUser = user
        return await this.teamRepository.save(newTeam)
        } catch (error) {
            return error
        }
    }

    async findTeam(query: FilterQuery): Promise<{ data: TeamTable[]; count: number; }> {
        try {
            const filter : QueryDto = JSON.parse(query.query)
            const [team,count] = await this.teamRepository.findAndCount(filter as FindManyOptions<TeamTable>)
            return{
                data: team,
                count: count
            }
        } catch (error) {
            throw new Error("Geçerli Bir Sorgu Girin")
        }
    }

    async excelTeam(query: FilterQuery, authenticatedUserId: string): Promise<string> {
        try {
            const redisData = await this.redisService.get(authenticatedUserId)
            if(redisData != null) {
                throw new BadRequestException("Excel için gerekli olan süre beklenmedi")
            }
            const filter : QueryDto = JSON.parse(query.query)
            const [team,count] = await this.teamRepository.findAndCount(filter as FindManyOptions<TeamTable>)
            await this.redisService.set(authenticatedUserId,true,1000)
            return await this.saveExcelMemoryService.excelExport(team,'team')
        } catch (error) {
            throw new Error("Geçerli Bir Sorgu Girin")
        }
    }

    async deleteTeam(id: number): Promise<boolean> {
        const team = this.teamRepository.findOne({where:{id:id}})
        if(team){
            await this.teamRepository.delete(id)
            return true
        }
        else throw new NotFoundException("Team not found")
    }

    async updateTeam(id: number, team: TeamDto, authenticatedUserId: string): Promise<TeamTable> {
        const teamData = await this.teamRepository.findOne({where:{id:id},loadRelationIds:true})
        if(teamData){
            Object.assign(teamData, team)
            teamData.updatedAt = new Date()
            const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
            teamData.updatedUser = user
            if(teamData.updatedUser != teamData.createdUser) throw new UnAuthGameUpdate("this user is unauthorized in this team ")
            return await this.teamRepository.save(teamData)
        }
        else throw new NotFoundException("Team not found")
    }

    async joinTeam(authenticatedUserId: string,id:number): Promise<boolean> {
        let already = false
        Logger.log(already)
        const teamData = await this.teamRepository.findOne({where:{id:id},relations:['users'],})
        if(teamData){
            const team:TeamTable = teamData
            const user = parseInt(authenticatedUserId)
            const userData = await this.userRepository.findOne({where:{id:user}})
            team.users.forEach((user:UserTable)=>{
                console.log("burada döngüde")
                if(user.id === userData.id){
                    console.log("burada")
                    already = true
                }
            })
            Logger.log(already)
            if(already){
                return false
            }
            else{
            team.users.push(userData)
            Object.assign(teamData, team)
            teamData.updatedAt = new Date()
            const user = await this.userRepository.findOne({where: {id: parseInt(authenticatedUserId)}})
            teamData.updatedUser = user
            Logger.log(teamData)
            await this.teamRepository.save(teamData)
            return true
            }
            
        }
        else throw new NotFoundException("Team not found")
    }

    async isUserInTeam(teamId: number,userId: number): Promise<boolean> {
        let authority = false
        const teamData = await this.teamRepository.findOne({where:{id:teamId},relations:['users'],})
        for (const user of teamData.users){
            if(user.id == userId){
                authority = true
                break;
            }
        }
        return authority
    }

    async inUserTeams(userId:string){
        console.log("içeride ", userId)
        const teams = await this.teamRepository.find({relations:["users"]})
        let userTeams:TeamTable[] = []
        teams.map(team =>{
            team.users.map(user=>{
                if(user.id == parseInt(userId)){
                    userTeams.push(team)
                }
            })
        })
        return userTeams
    }

}