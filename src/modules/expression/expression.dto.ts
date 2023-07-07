import { IsString, IsOptional, IsISO8601, IsBoolean, IsNumber } from "class-validator";
import { UserTable } from "../user/user.entity";
import { EventTable } from "../event/event.entity";

export class ExpressionDto {

    @IsOptional()
    @IsString()
    place?:string;

    @IsOptional()
    @IsISO8601()
    expressionDate?:Date;

    @IsOptional()
    @IsString()
    declaration?:string;

    @IsOptional()
    @IsString()
    identityNumber?:string;

    @IsOptional()
    @IsString()
    motherName?:string;

    @IsOptional()
    @IsString()
    fatherName?:string;

    @IsOptional()
    @IsString()
    personName?:string;

    @IsOptional()
    @IsString()
    phoneNumber?:string;

    @IsOptional()
    @IsString()
    placeOfBirth?:string;

    @IsOptional()
    @IsString()
    martialStatus?:string;

    @IsOptional()
    @IsString()
    learnStatus?:string;

    @IsOptional()
    @IsBoolean()
    guilty?:boolean;

    @IsOptional()
    @IsString()
    imageBase64?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsNumber()
    createdUser?: UserTable;

    @IsOptional()
    @IsNumber()
    event?: EventTable;

}