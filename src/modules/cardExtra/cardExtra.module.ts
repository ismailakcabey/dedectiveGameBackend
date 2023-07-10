import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaveImageMemoryService } from "src/shared/services/saveImageToMemory.service";
import { UserTable } from "../user/user.entity";
import { CardExtraTable } from "./cardExtra.entity";
import { CardExtraController } from "./cardExtra.controller";
import { CardExtraService } from "./cardExtra.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([CardExtraTable]),
        TypeOrmModule.forFeature([UserTable]),
    ],
    controllers:[
        CardExtraController
    ],
    providers:[
        CardExtraService
    ],
    exports:[]
})

export class CardExtraModule{}