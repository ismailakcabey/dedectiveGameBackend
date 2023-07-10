import { IsOptional, IsString } from "class-validator";

export class TeamDto{

    @IsOptional()
    @IsString()
    name?:string;

}