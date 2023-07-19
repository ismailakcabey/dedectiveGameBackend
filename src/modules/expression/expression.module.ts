import { Module } from "@nestjs/common";
import { ExpressionTable } from "./expression.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { ExpressionService } from "./expression.service";
import { ExpressionController } from "./expression.controller";
import { UserTable } from "../user/user.entity";
import { EventTable } from "../event/event.entity";
import { EventService } from "../event/event.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([ExpressionTable]),
        TypeOrmModule.forFeature([UserTable]),
        TypeOrmModule.forFeature([EventTable]),
    ],
    controllers:[
        ExpressionController
    ],
    providers:[
        SaveImageMemoryService,
        ExpressionService,
        EventService
    ],
    exports:[]
})

export class ExpressionModule{}