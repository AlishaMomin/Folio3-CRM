import { order } from "src/order/entity/order.entity";
import { product } from "src/product/entity/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class orderline{
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ type: 'numeric', precision: 65, scale: 2 })
    PerUnitPrice: number;

    @Column({ type: 'numeric', precision: 65, scale: 2 })
    Amount: number;

    @Column()
    Quantity: number;

// foreign key
// productid
    @ManyToOne(()=>product,(Product)=>Product.Orderline)
    Product:product

// orderid
    @ManyToOne(()=>order,(Order)=>Order.Orderline)
    Order:order

}