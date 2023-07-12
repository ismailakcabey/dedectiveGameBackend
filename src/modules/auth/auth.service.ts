import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IAuthService } from "./auth.interface";
import { LoginDto } from "./auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTable } from "../user/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
const passwordHash = require('password-hash');

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>,
        private readonly jwtService: JwtService
    ) { }

    async me(authenticatedUserId:string):Promise<UserTable>{
        const user = parseInt(authenticatedUserId)
        return await this.userRepository.findOne({where:{id:user}})
    }

    async login(login: LoginDto): Promise<{ status: boolean; token: string; }> {
        const loginUser = await this.userRepository.findOne({ where: { email: login.email } });

        if (!loginUser) {
            throw new NotFoundException("User not found");
        }

        const isPasswordValid = await passwordHash.verify(login.password, loginUser.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const jwt = await this.jwtService.signAsync({ id: loginUser.id, role: loginUser.role });

        return {
            status: true,
            token: jwt
        };
    }


    logout(token: string): Promise<{ status: boolean; }> {
        throw new Error("Method not implemented.");
    }

    async verify(createdAt: string): Promise<{ status: boolean; }> {
        const dateObj = new Date(createdAt);
        const user = await this.userRepository.findOne({where:{createdAt:dateObj}})
        if (!user) throw new NotFoundException(`User ${createdAt} not found`);
        user.isVerify = true;
        await this.userRepository.save(user)
        return {
            status: true,
        }
    }

}