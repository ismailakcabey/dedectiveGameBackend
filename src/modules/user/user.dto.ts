import { IsBoolean, IsDate, IsEnum, IsString, ValidateIf } from 'class-validator'
import { Role } from './user.enum';

export class UserDto {

    @IsString()
    userName?: string;

    @IsString()
    password?: string;

    @IsString()
    email?: string;

    @IsString()
    phoneNumber?: string;

    @IsDate()
    birthDate?: Date;

    @IsBoolean()
    isVerify?: boolean;

    @IsEnum(Role)
    role?: Role;

}