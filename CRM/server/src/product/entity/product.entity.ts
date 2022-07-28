import { company } from "src/company/entity/company.entity";
import { orderline } from "src/orderline/entity/orderline.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class product {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @Column()
    Sku: string;

// Foreign key
// companyid
    @ManyToOne(()=>company,(Company)=>Company.Product)
    Company:company

    @OneToMany(()=>orderline,(Orderline)=>Orderline.Product)
    Orderline: orderline[]

}