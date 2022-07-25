import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class orderline{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    perunitprice: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    amount: number;

    @Column()
    quantity: number;

    // foreign key
    @Column()
    productid: number;

    @Column()
    orderid: number;

}