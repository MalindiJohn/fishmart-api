import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToOne, DeleteDateColumn, OneToMany, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity({name: 'sales'})
export class Sale {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    productName: string;

    @Column()
    price: string;

    @Column()
    quantity: string;

    @Column()
    totalPrice: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.sale, {
        // onDelete: 'CASCADE'
    })
    user: User

}
