import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


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
    @Column()
    companyid: number;

    @Column()
    roleid: number;
}