import { Module } from "@nestjs/common";
import { UserTable } from "../user/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageTable } from "./message.entity";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { EventService } from "../event/event.service";
import { EventTable } from "../event/event.entity";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserTable]),
        TypeOrmModule.forFeature([MessageTable]),
        TypeOrmModule.forFeature([EventTable]),
    ],
    controllers:[
        MessageController
    ],
    providers:[
        MessageService,
        EventService,
        SaveImageMemoryService
    ],
    exports:[],
})

export class MessageModule {}