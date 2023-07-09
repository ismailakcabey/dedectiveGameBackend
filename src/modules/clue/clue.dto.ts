import { IsNumber, IsOptional, IsString } from "class-validator";
import { UserTable } from "../user/user.entity";
import { EventTable } from "../event/event.entity";

export class ClueDto{

    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsString()
    text?:string;

    @IsOptional()
    @IsString()
    imageBase64?: string;

    @IsOptional()
    @IsNumber()
    createdUser?: UserTable;

    @IsOptional()
    @IsNumber()
    event?: EventTable;

}