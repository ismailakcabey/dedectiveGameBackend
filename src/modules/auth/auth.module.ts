import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { UserTable } from "../user/user.entity";
import { AuthController } from "./auth.controller";
@Module({
    imports: [
        TypeOrmModule.forFeature([UserTable]),
        UserModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ],
    exports: [
    ]
})

export class AuthModule{}