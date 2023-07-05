import { Column , Entity } from 'typeorm'

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

}