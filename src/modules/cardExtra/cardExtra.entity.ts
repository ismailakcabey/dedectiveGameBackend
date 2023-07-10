import { BaseEntity } from "src/shared/entitys/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventTable } from "../event/event.entity";

@Entity()
export class CardExtraTable extends BaseEntity{

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'card_extra_id',
    })
    id: number

    @Column({
        type: 'varchar'
    })
    payer?: string

    @Column({
        type: 'varchar'
    })
    product?: string

    @Column({
        type: 'numeric'
    })
    price?: number

    @ManyToOne(() => EventTable, event => event.id)
    @JoinColumn({ name: 'event_id' })
    event: EventTable;

}