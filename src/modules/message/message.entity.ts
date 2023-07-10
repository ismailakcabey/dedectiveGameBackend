import { BaseEntity } from "src/shared/entitys/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventTable } from "../event/event.entity";

@Entity()
export class MessageTable extends BaseEntity{

    @PrimaryGeneratedColumn({
        type:'bigint',
        name:'message_id'
    })
    id:number

    @Column({
        type: 'varchar'
    })
    sender?: string

    @Column({
        type: 'varchar'
    })
    receiver?: string

    @Column({
        type: 'json'
    })
    messages?: object

    @ManyToOne(() => EventTable, event => event.id)
    @JoinColumn({ name: 'event_id' })
    event: EventTable;

}