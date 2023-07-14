import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTable } from "../user/user.entity";
import { EventTable } from "../event/event.entity";
import { ExpressionTable } from "../expression/expression.entity";
import { ClueTable } from "../clue/clue.entity";
import { CardExtraTable } from "../cardExtra/cardExtra.entity";
import { MessageTable } from "../message/message.entity";
import { ReportController } from "./report.controller";
import { ReportsService } from "./report.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([EventTable]),
        TypeOrmModule.forFeature([ExpressionTable]),
        TypeOrmModule.forFeature([ClueTable]),
        TypeOrmModule.forFeature([CardExtraTable]),
        TypeOrmModule.forFeature([UserTable]),
        TypeOrmModule.forFeature([MessageTable]),
    ],
    controllers:[
        ReportController
    ],
    providers:[
        ReportsService
    ],
    exports:[]
})

export class ReportModule{}