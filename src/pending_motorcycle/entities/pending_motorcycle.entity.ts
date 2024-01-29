import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pending_motorcycles')
export class PendingMotorcycle {

    @PrimaryGeneratedColumn('uuid')
    id: string;

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
}
