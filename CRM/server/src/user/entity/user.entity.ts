import { company } from "src/company/entity/company.entity";
import { order } from "src/order/entity/order.entity";
import { role } from "src/role/entity/role.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class user {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    contactnumber: string;

    @Column()
    email: string;

    @Column()
    password: string;

// foreign key 

// companyid
    @ManyToOne(()=>company, (Company)=>Company.User)
    Company:company[]
// roleid
    @ManyToOne(()=>role, (Role)=>Role.User)
    Role:role[]

    @OneToMany(()=>order,(Order)=>Order.Buyer)
    Order:order[]

    @OneToMany(()=>order,(Order)=>Order.Seller)
    Orders:order[]

    
}