import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, JoinColumn, OneToOne, DeleteDateColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'fish-farm-info'})
export class Fishinfo{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    title: string;

    @Column()
    subTitle: string;

    @Column()
    description: string;
}