import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../../products/entities';
import { LoginUser } from './login.entity';
import { Almacen } from 'src/almacen/entities/almacen.entity';


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;


    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];


    @Column("json", { nullable: true })
    resource: any;
   


    @Column({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    
    
    @ManyToMany(() => Almacen, (almacen) => almacen.users , { eager: true })
    @JoinTable()
    almacenes: Almacen[];

    @OneToMany(
        () => LoginUser, 
        loginUser => loginUser.user)

    loginUsers: LoginUser;

    


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
