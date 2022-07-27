import { orderline } from "src/orderline/entity/orderline.entity";
import { user } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum transactiontype{
    CASH = 'cash',
    CHEQUE = 'cheque',
    ONLINE = 'online',
}

export enum invoicestatus{
    PAID = 'paid',
    UNPAID = 'unpaid',
}

@Entity()
export class order{
    @PrimaryGeneratedColumn()
    Id:number

    @Column({ type: 'numeric', precision: 65, scale: 2 })
    TotalAmount: number;

    @Column({ type: 'date' })
    DateOfOrder: string;

    @Column({ type: 'date' })
    LastDate: string;

    @Column({
        type: "enum",
        enum: transactiontype,
        default: transactiontype.ONLINE,
    })
    TransactionType: transactiontype

    @Column()
    ReferenceNo: string;

    @Column()
    Name: string;

    @Column({
        type: "enum",
        enum: invoicestatus,
        default: invoicestatus.PAID,
    })
    InvoiceStatus: invoicestatus

    // foreign key
    @OneToMany(()=>orderline,(Orderline)=>Orderline.Order)
    Orderline:orderline[]

    @ManyToOne(()=>user,(Buyer)=>Buyer.Order)
    Buyer:user[]

    @ManyToOne(()=>user,(Seller)=>Seller.Orders)
    Seller:user[]
}