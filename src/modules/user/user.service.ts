import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserTable } from './user.entity'
import { UserDto } from './user.dto'
import { FindManyOptions, Repository } from 'typeorm';
import { IUserService } from './user.interface';
import { FilterQuery, QueryDto } from 'src/shared/dtos/query.dto';
import { RabbitMQService } from 'src/shared/services/rabbit.service';
const passwordHash = require('password-hash');


@Injectable()
export class UserService implements IUserService {

    constructor(
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>,
        private readonly rabbitMqService: RabbitMQService
    ) { }

    async createUser(user: UserDto): Promise<UserTable> {
        const newUser = await this.userRepository.create(user);
        newUser.createdAt = new Date
        newUser.password = passwordHash.generate(newUser.password)
        await this.rabbitMqService.sendQueueMessage('email', newUser)
        const savedUser = this.userRepository.save(newUser);
        return savedUser
    }

    async findUser(query: FilterQuery): Promise<{ data: UserTable[]; count: number; }> {
        try {
            const filter: QueryDto = JSON.parse(query.query)
            const [user, count] = await this.userRepository.findAndCount(filter as FindManyOptions<UserTable>)
        return {
            data: user,
            count: count
        }
        } catch (error) {
            throw new BadRequestException("Geçerli Bir Sorgu Girin")
        }
        
    }

    async findUserById(id: number): Promise<UserTable> {
        const user = await this.userRepository.findOne({ where: { id: id } })
        if (user) {
            return user
        }
        else {
            throw new NotFoundException('user not found.');
        }

    }

    async updateUser(user: UserDto, id: number,authenticatedUserId:string): Promise<UserTable> {
        const updatedUser = await this.userRepository.findOne({ where: { id: id } })
        if (updatedUser) {
            Object.assign(updatedUser, user)
            updatedUser.updatedAt = new Date
            updatedUser.updatedUser = parseInt(authenticatedUserId)
            return await this.userRepository.save(updatedUser)
        }
        else {
            throw new NotFoundException('user not found');
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { id: id } })
        if (user) {
            const deleted = await this.userRepository.delete(id)
            return true
        }
        else {
            throw new NotFoundException('user not found');
        }
    }

}
