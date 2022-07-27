import { user } from "src/user/entity/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class role{
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    RoleName: string;

    @OneToMany(()=>user, (User)=>User.Role)
    User: user[]

}