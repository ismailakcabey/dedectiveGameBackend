import { UserTable } from "../user/user.entity";
import { LoginDto } from "./auth.dto";

export interface IAuthService{
    login(login:LoginDto):Promise<{
        status:boolean,
        token:string
    }>;
    logout(token:string):Promise<{
        status:boolean
    }>;
    verify(createdAt:string):Promise<{
        status:boolean
    }>
    me(authenticatedUserId:string):Promise<UserTable>
}