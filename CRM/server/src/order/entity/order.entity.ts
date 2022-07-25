import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
    id:number

    @Column({ type: 'numeric', precision: 65, scale: 2 })
    totalamount: number;

    @Column({ type: 'date' })
    dateoforder: string;

    @Column({ type: 'date' })
    lastdate: string;

    @Column({
        type: "enum",
        enum: transactiontype,
        default: transactiontype.ONLINE,
    })
    Transactiontype: transactiontype

    @Column()
    referenceno: number;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: invoicestatus,
        default: invoicestatus.PAID,
    })
    Invoicestatus: invoicestatus

    // foreign key
    @Column()
    sellerid: number;

    @Column()
    buyerid: number;
}