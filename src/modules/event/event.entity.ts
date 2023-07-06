import { BaseEntity } from 'src/shared/entitys/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserTable } from '../user/user.entity';

@Entity()
export class EventTable extends BaseEntity{

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'event_id',
    })
    id: number

    @Column({
        type: 'varchar',
        nullable: true
    })
    name: string

    @Column({
        type: 'varchar',
        nullable: true
    })
    imageBase64: string// base64 encoded

    @Column({
        type: 'varchar',
        nullable: true
    })
    imageUrl: string

    @Column({
        type: 'varchar',
        nullable: true
    })
    summary: string

    @Column({
        type: 'varchar',
        nullable: true
    })
    news: string

    @ManyToOne(() => UserTable, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserTable;

}