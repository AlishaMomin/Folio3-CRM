import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    sku: string;

    // Foreign key
    @Column()
    companyid: number;
}