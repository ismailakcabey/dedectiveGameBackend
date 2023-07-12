import { Body, Controller,Post, Req, Param, Get, UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.dto";
import { Request } from "express";
import { UserTable } from "../user/user.entity";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(
        @Body() login: LoginDto
    ):Promise<{
        status:boolean,
        token:string
    }>{
        return await this.authService.login(login)
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(
        @Req() req: Request
    ):Promise<UserTable>{
        //@ts-ignore
        const authenticatedUserId = req?.user?.id
        return await this.authService.me(authenticatedUserId)
    }

    @Post('logout')
    async logout(
        @Req() req: Request
    ):Promise<{
        status:boolean
    }>{
        return{
            status:true
        }
    }

    @Get('verify/:createdAt')
    async verify(
        @Param('createdAt') createdAt:string
    ):Promise<{
        status:boolean
    }>{
        return await this.authService.verify(createdAt)
    }

}