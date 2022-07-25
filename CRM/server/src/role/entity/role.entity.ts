import { user } from "src/user/entity/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class role{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rolename: string;

    @OneToMany(()=>user, (User)=>User.Role)
    User: user[]

}