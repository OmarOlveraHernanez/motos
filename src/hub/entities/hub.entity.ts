import { PendingMotorcycle } from "src/pending_motorcycle/entities/pending_motorcycle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('hubs')
export class Hub {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("json", { nullable: true })
    resource: any;


    @Column("json", { nullable: true })
    config: any;

    @Column({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    

    @OneToMany(
        () => PendingMotorcycle, 
        pending_motorcycle => pending_motorcycle.hub)

    pending_motorcycle: PendingMotorcycle;

}
