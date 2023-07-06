import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventTable } from "./event.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventController } from "./event.controller";
import { UserTable } from "../user/user.entity";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([EventTable]),
        TypeOrmModule.forFeature([UserTable]),
    ],
    controllers:[
        EventController
    ],
    providers:[
        EventService,
        SaveImageMemoryService
    ],
    exports:[]
})

export class EventModule{}