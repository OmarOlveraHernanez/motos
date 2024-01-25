import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LoginUser } from './login.entity';
import { DataUser } from 'src/data_user/entities/data_user.entity';


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

    
    
  

    @OneToMany(
        () => LoginUser, 
        loginUser => loginUser.user)

    loginUsers: LoginUser;


    @OneToOne(() => DataUser, data_user => data_user.user, { cascade: true })
    @JoinColumn()
    data_user: DataUser;

    


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
