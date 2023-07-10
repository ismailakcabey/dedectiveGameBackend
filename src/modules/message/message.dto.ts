import { IsArray, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { EventTable } from "../event/event.entity";



export class MessageDto{

    @IsOptional()
    @IsString()
    sender?:string;

    @IsOptional()
    @IsString()
    receiver?:string;

    @IsOptional()
    @IsArray()
    messages?:Array<object>;

    @IsOptional()
    @IsNumber()
    event?: EventTable;

}