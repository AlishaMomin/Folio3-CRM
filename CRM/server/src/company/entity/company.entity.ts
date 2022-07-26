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
    
    @OneToMany(()=>user,(User)=>User.Company)
    User:user[]

    @OneToMany(()=>product,(Product)=>Product.Company)
    Product:product[]

// hostcompanyid
    @OneToMany(()=>company,(hostcompany)=>hostcompany.HostCompany)
    hostcompany: company[]
    @ManyToOne(()=>company,(HostCompany)=>HostCompany.hostcompany)
    HostCompany:company[]

}