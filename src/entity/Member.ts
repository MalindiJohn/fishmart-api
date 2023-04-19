import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity({name: 'members'})
export class Member{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => User, (user)  => user.member, {
        cascade: true,
        // onDelete: 'CASCADE'
    })
    @JoinColumn()
    user: User

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    telephone: string;

    @Column()
    location: string;

    @Column({
        default: true
    })
    isVip: boolean;
}