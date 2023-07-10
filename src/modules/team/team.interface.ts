import { FilterQuery } from "src/shared/dtos/query.dto";
import { TeamDto } from "./team.dto";
import { TeamTable } from "./team.entity";

export interface ITeamService{
    createTeam(team:TeamDto,authenticatedUserId:string):Promise<TeamTable>;
    findTeam(query:FilterQuery):Promise<{
        data:TeamTable[],
        count:number
    }>
    excelTeam(query:FilterQuery, authenticatedUserId: string):Promise<string>
    deleteTeam(id:number):Promise<boolean>;
    updateTeam(id:number,team:TeamDto,authenticatedUserId:string):Promise<TeamTable>;
    joinTeam(authenticatedUserId:string,id:number):Promise<boolean>;
}