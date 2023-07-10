import { IsNumber, IsOptional, IsString } from "class-validator";
import { EventTable } from "../event/event.entity";

export class CardExtraDto{

    @IsOptional()
    @IsString()
    payer?:string;

    @IsOptional()
    @IsString()
    product?:string;

    @IsOptional()
    @IsNumber()
    price?:number;

    @IsOptional()
    @IsNumber()
    event?: EventTable;

}