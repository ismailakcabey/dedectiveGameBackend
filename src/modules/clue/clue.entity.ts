import { BaseEntity } from "src/shared/entitys/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserTable } from "../user/user.entity";
import { EventTable } from "../event/event.entity";

@Entity()
export class ClueTable extends BaseEntity{

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'clue_id',
    })
    id: number

    @Column({
        type: 'varchar'
    })
    name?: string

    @Column({
        type: 'varchar'
    })
    text?: string

    @Column({
        type: 'varchar'
    })
    imageUrl?: string

    @ManyToOne(() => UserTable, user => user.id)
    @JoinColumn({ name: 'user_id' })
    createdUser: UserTable;

    @ManyToOne(() => EventTable, event => event.id)
    @JoinColumn({ name: 'event_id' })
    event: EventTable;

}