import { product } from "src/product/entity/product.entity";
import { user } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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
    HostCompany: company[]
    @OneToMany(()=>company,(ClientCompany)=>ClientCompany.HostCompany)
    ClientCompany:company[]

}