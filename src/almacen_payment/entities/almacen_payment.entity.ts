import { ApiProperty } from "@nestjs/swagger";
import { Almacen } from "src/almacen/entities/almacen.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'almacen_payments' })
export class AlmacenPayment {

    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column("json", { nullable: true })
    resource: any;
   
    @OneToMany(
        () => Almacen, 
        almacen => almacen.almacenPayment)
    almacen: Almacen;

    @Column({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;



    @UpdateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
