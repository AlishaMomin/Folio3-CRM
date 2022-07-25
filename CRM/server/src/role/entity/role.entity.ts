import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class role{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rolename: string;
}