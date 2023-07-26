import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventTable } from "./event.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventController } from "./event.controller";
import { UserTable } from "../user/user.entity";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { EventEmptyControlCron } from "./event-empty-control.cron";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports:[
        TypeOrmModule.forFeature([EventTable]),
        TypeOrmModule.forFeature([UserTable]),
        ScheduleModule.forRoot()
    ],
    controllers:[
        EventController
    ],
    providers:[
        EventService,
        SaveImageMemoryService,
        EventEmptyControlCron
    ],
    exports:[
    ]
})

export class EventModule{}