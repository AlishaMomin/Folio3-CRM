import { order } from "src/order/entity/order.entity";
import { product } from "src/product/entity/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class orderline{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'numeric', precision: 65, scale: 2 })
    perunitprice: number;

    @Column({ type: 'numeric', precision: 65, scale: 2 })
    amount: number;

    @Column()
    quantity: number;

// foreign key
// productid
    @ManyToOne(()=>product,(Product)=>Product.Orderline)
    Product:product[]

// orderid
    @ManyToOne(()=>order,(Order)=>Order.Orderline)
    Order:order[]

}