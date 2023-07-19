import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { UserTable } from "../user/user.entity";
import { CardExtraTable } from "./cardExtra.entity";
import { CardExtraController } from "./cardExtra.controller";
import { CardExtraService } from "./cardExtra.service";
import { EventTable } from "../event/event.entity";
import { EventService } from "../event/event.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([CardExtraTable]),
        TypeOrmModule.forFeature([UserTable]),
        TypeOrmModule.forFeature([EventTable]),
    ],
    controllers:[
        CardExtraController
    ],
    providers:[
        CardExtraService,
        EventService,
        SaveImageMemoryService
    ],
    exports:[]
})

export class CardExtraModule{}