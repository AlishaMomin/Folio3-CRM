import { product } from "src/product/entity/product.entity";
import { user } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {TYPE} from "../enums/type.enum";
import { ISDELETE } from "../enums/Isdelete.enum";



@Entity()
export class company{
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @Column({
        type: "enum",
        enum: TYPE,
        default: TYPE.HOST,
    })
    Type: TYPE

    @Column({
        type: "enum",
        enum: ISDELETE,
        default: ISDELETE.ACTIVE,
    })
    Isdelete: ISDELETE


    // FOREIGN KEY
    @OneToMany(()=>user,(User)=>User.Company)
    User:user[]

    @OneToMany(()=>product,(Product)=>Product.Company)
    Product:product[]

// hostcompanyid - self referencing
    @ManyToOne(()=>company,(HostCompany)=>HostCompany.ClientCompany)
    HostCompany: company
    @OneToMany(()=>company,(ClientCompany)=>ClientCompany.HostCompany)
    ClientCompany:company[]

}