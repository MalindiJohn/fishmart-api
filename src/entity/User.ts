import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm"
import { Member } from "./Member";
import { Sale } from "./Sale";
import { Expense } from "./Expense";

@Entity({name: 'logins'})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    email: string;

    @Column()
    salt:string;

    @Column()
    password: string;

    @Column({

        default: false
    })
    isStaff: boolean;

    @OneToOne( type => Member, member => member.user, {

        onDelete: 'CASCADE',
    })
    member: Member;

    @OneToMany( type => Sale, sale => sale.user, {

        onDelete: 'CASCADE',
    })
    sale: Sale;

    @OneToMany( type => Expense, expense => expense.user, {

        onDelete: 'CASCADE',
    })
    expense: Expense;

}
