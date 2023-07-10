import { BaseEntity } from "src/shared/entitys/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserTable } from "../user/user.entity";

@Entity()
export class TeamTable extends BaseEntity{

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'team_id',
    })
    id: number

    @Column({
        type: 'varchar'
    })
    name?: string

    @ManyToMany(() => UserTable, user => user.id)
    @JoinTable()
    users: UserTable[];

}