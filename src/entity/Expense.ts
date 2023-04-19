import { CreateDateColumn, Entity, OneToOne, Column, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, DeleteDateColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'expenses'})
export class Expense {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(type => User, user => user.sale, {
        // onDelete: 'CASCADE'
    })
    user: User

    @Column()
    name: string

    @Column()
    amount: string

    @Column()
    description: string
}
