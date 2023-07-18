import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'
import { UserTable } from '../user/user.entity';

export class EventDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    imageBase64?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsString()
    summary?: string;

    @IsOptional()
    @IsString()
    news?: string;

    @IsOptional()
    @IsString()
    realHistory?: string;


}