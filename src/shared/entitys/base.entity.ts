import { UserTable } from 'src/modules/user/user.entity';
import { Column , Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity()
export class BaseEntity {

    @Column({
        type:'timestamp',
        nullable: false,
        default: new Date
    })
    createdAt:Date

    @Column({
        type:'timestamp',
        nullable: true
    })
    updatedAt:Date

    @ManyToOne(() => UserTable, user => user.id)
    @JoinColumn({ name: 'updated_user_id' })
    updatedUser: UserTable;

    @ManyToOne(() => UserTable, user => user.id)
    @JoinColumn({ name: 'created_user_id' })
    createdUser: UserTable;

}