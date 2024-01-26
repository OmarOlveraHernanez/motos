import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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


}
