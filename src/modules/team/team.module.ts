import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTable } from "../user/user.entity";
import { TeamTable } from "./team.entity";
import { TeamController } from "./team.controller";
import { TeamService } from "./team.service";
import { RedisService } from "src/shared/services/redis.service";
import { SaveExcelMemoryService } from "src/shared/services/saveExcelToMemory.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([TeamTable]),
        TypeOrmModule.forFeature([UserTable]),
    ],
    controllers:[
        TeamController
    ],
    providers:[
        TeamService,
        RedisService,
        SaveExcelMemoryService
    ],
    exports:[]
})

export class TeamModule{}