import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTable } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { EmailService } from "src/shared/services/email.service";
import { RabbitMQService } from "src/shared/services/rabbit.service";
@Module({
    imports: [
        TypeOrmModule.forFeature([UserTable]),
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        RabbitMQService,
        EmailService
    ],
    exports: [
    ]
})

export class UserModule{}