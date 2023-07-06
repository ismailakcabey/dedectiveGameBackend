import { IsBoolean, IsDate, IsEnum, IsISO8601, IsOptional, IsString, ValidateIf } from 'class-validator'
import { Role } from './user.enum';
import { ISO8601DateTime } from 'aws-sdk/clients/licensemanager';

export class UserDto {

    @IsOptional()
    @IsString()
    userName?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsISO8601()
    birthDate?: Date;

    @IsOptional()
    @IsBoolean()
    isVerify?: boolean;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;

}