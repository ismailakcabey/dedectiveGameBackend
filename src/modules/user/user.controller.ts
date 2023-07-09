
import {
    Body,
    Controller,
    Post,
    Req,
    Get,
    Query,
    Patch,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common'
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserTable } from './user.entity';
import { FilterQuery } from 'src/shared/dtos/query.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from './user.enum';
import { Request } from 'express'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    async createUser(
        @Body() user: UserDto
    ): Promise<UserTable> {
        return this.userService.createUser(user)
    }

    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)
    async findUser(
        @Query() user: FilterQuery
    ): Promise<{
        data: UserTable[],
        count: number
    }> {
        return this.userService.findUser(user)
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN,Role.USER)
    async findUserById(
        @Param('id') id: number
    ): Promise<UserTable> {
        return this.userService.findUserById(id)
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN,Role.USER)
    async updateUser(
        @Param('id') id: number,
        @Body() user: UserDto,
        @Req() request: Request
    ): Promise<UserTable> {
         //@ts-ignore
         const authenticatedUserId = request?.user?.id
        return this.userService.updateUser(user, id,authenticatedUserId)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN,Role.USER)
    async deleteUserById(
        @Param('id') id: number
    ): Promise<boolean> {
        return this.userService.deleteUser(id)
    }

}