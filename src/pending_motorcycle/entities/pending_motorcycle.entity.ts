import { Hub } from "src/hub/entities/hub.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pending_motorcycles')
export class PendingMotorcycle {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("json", { nullable: true })
    resource: any;
    
    @Column({
        type: 'timestamp',
        nullable: true
       })
    accepted: Date;

    @Column({
        type: 'timestamp',
        nullable: true
       })
    vigency: Date;

    @Column({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(
        () => Hub,
        hub => hub.pending_motorcycle,
        { eager: true }
        )
    hub: Hub;


}
