import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { UserTable } from "../user/user.entity";
import { ClueTable } from "./clue.entity";
import { ClueController } from "./clue.controller";
import { ClueService } from "./clue.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([ClueTable]),
        TypeOrmModule.forFeature([UserTable]),
    ],
    controllers:[
        ClueController
    ],
    providers:[
        SaveImageMemoryService,
        ClueService
    ],
    exports:[]
})

export class ClueModule{}