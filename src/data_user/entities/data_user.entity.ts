import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('data_users')
export class DataUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("json", { nullable: true })
    personal: any;

    @Column("json", { nullable: true })
    contacts : any[];

    @Column("json", { nullable: true })
    medical: any;

    @Column("json", { nullable: true })
    others: any[];
   
    @Column({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    
    
}
