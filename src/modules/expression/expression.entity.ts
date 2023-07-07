import { BaseEntity } from "src/shared/entitys/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserTable } from "../user/user.entity";
import { EventTable } from "../event/event.entity";

@Entity()
export class ExpressionTable extends BaseEntity{

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'expression_id',
    })
    id: number

    @Column({
        type: 'varchar'
    })
    place?: string

    @Column({
        type: 'timestamp'
    })
    expressionDate?: Date

    @Column({
        type: 'varchar'
    })
    declaration?: string

    @Column({
        type: 'varchar'
    })
    identityNumber?: string

    @Column({
        type: 'varchar'
    })
    motherName?: string

    @Column({
        type: 'varchar'
    })
    fatherName?: string

    @Column({
        type: 'varchar'
    })
    personName?: string

    @Column({
        type: 'varchar'
    })
    phoneNumber?: string

    @Column({
        type: 'varchar'
    })
    placeOfBirth?: string

    @Column({
        type: 'varchar'
    })
    martialStatus?: string

    @Column({
        type: 'varchar'
    })
    learnStatus?: string

    @Column({
        type: 'boolean'
    })
    guilty?: boolean

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