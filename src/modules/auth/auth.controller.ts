import { Body, Controller,Post, Req, Param, Get} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.dto";
import { Request } from "express";

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