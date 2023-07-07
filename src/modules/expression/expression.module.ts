import { Module } from "@nestjs/common";
import { ExpressionTable } from "./expression.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { ExpressionService } from "./expression.service";
import { ExpressionController } from "./expression.controller";
import { UserTable } from "../user/user.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([ExpressionTable]),
        TypeOrmModule.forFeature([UserTable]),
    ],
    controllers:[
        ExpressionController
    ],
    providers:[
        SaveImageMemoryService,
        ExpressionService
    ],
    exports:[]
})

export class ExpressionModule{}