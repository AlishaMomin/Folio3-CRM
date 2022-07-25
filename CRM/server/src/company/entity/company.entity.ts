import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum TYPE {
   HOST = 0,
   CLIENT = 1,
}
export enum ISDELETE{
    ACTIVE = 0,
    DELETE = 1,
}

@Entity()
export class company{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: TYPE,
        default: TYPE.HOST,
    })
    type: TYPE

    @Column({
        type: "enum",
        enum: ISDELETE,
        default: ISDELETE.ACTIVE,
    })
    isdelete: ISDELETE


    // FOREIGN KEY
    @Column()
    hostcompanyid: number

}