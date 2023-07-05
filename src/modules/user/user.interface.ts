import { FilterQuery } from "src/shared/dtos/query.dto";
import { UserDto } from "./user.dto";
import { UserTable } from "./user.entity";
export interface IUserService{
    createUser(user:UserDto): Promise<UserTable>;
    findUser(query:FilterQuery):Promise<{
        data:UserTable[],
        count:number
    }>;
    findUserById(id:number):Promise<UserTable>;
    updateUser(user:UserDto,id:number):Promise<UserTable>;
    deleteUser(id:number):Promise<boolean>;
}