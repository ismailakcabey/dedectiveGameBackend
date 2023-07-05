import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./user.enum";
import { BaseEntity } from "src/shared/entitys/base.entity";

@Entity()
export class UserTable extends BaseEntity{

    @PrimaryGeneratedColumn({
        type:'bigint',
        name:'user_id',
    })
    id:number

    @Column({
        type:'varchar',
        nullable:true,
    })
    userName:string

    @Column({
        type:'varchar',
        nullable:false
    })
    email:string

    @Column({
        type:'varchar',
        nullable:false
    })
    password:string

    @Column({
        type:'varchar',
        nullable:true
    })
    phoneNumber:string

    @Column({
        type:'timestamp',
        nullable:true
    })
    birthDate:Date

    @Column({
        type:'boolean',
        nullable:false,
        default:false
    })
    isVerify:boolean

    @Column({
        type:'varchar',
        nullable:false
    })
    role:Role

}