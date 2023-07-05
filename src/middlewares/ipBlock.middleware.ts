import { NestMiddleware , Injectable, UnauthorizedException } from "@nestjs/common";
import { Request , Response } from "express";

@Injectable()
export class IpBlockMiddleware implements NestMiddleware {

    constructor(

    ){}

    use(req: any, res: any, next: (error?: any) => void) {
        console.log("burada")
        const ipBlock = false
        if (!ipBlock) {
            next()
        }
        else{
            return{
                status:false,
                message:"not identified ip address"
            }
        }
    }

}