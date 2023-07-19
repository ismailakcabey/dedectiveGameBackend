import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { UserTable } from "../user/user.entity";
import { ClueTable } from "./clue.entity";
import { ClueController } from "./clue.controller";
import { ClueService } from "./clue.service";
import { EventService } from "../event/event.service";
import { EventTable } from "../event/event.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([ClueTable]),
        TypeOrmModule.forFeature([UserTable]),
        TypeOrmModule.forFeature([EventTable]),
    ],
    controllers:[
        ClueController
    ],
    providers:[
        SaveImageMemoryService,
        ClueService,
        EventService
    ],
    exports:[]
})

export class ClueModule{}