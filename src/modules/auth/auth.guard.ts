import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTable } from '../user/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>
    ) { }

    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {            
            throw new UnauthorizedException("token is required");
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: "secret"
                }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
            const user = await this.userRepository.findOne({where:{id: payload.id,isVerify:true}})
            if (user == null || user == undefined) {
                throw new UnauthorizedException("user not found");
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
        return {
            status: true,
            user: request.user
        };
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}