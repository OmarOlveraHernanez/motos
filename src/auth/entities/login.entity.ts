import {  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../../products/entities';
import { User } from './user.entity';


@Entity('login_users')
export class LoginUser {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        type: 'text',
        nullable: true
    })
    xFordwarderFor: string;

    @Column({
        type: 'text',
        nullable: true
    })
    aceptLanguage: string;

    @Column({
        type: 'text',
        nullable: true
    })
    userAgent: string;

    @Column({
         type: 'timestamp', 
         default: () => 'CURRENT_TIMESTAMP' })
    timeVigency: Date;

    @Column({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(
        () => User,
        user => user.loginUsers,
        { eager: true }
        )
    user: User;



    

}
