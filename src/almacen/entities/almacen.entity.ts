import { ApiProperty } from "@nestjs/swagger";
import { AlmacenPayment } from "src/almacen_payment/entities/almacen_payment.entity";
import { User } from "src/auth/entities/user.entity";
import { Product } from "src/products/entities";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'almacenes' })
export class Almacen {


    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column("json", { nullable: true })
    resource: any;


    @ManyToMany(() => User, (user) => user.almacenes)
    users: User[];

    @ManyToMany(type => Product, product => product.almacenes)
    Products: Product[];

    
    @ManyToOne(
        () => AlmacenPayment,
        almacenPayment => almacenPayment.almacen,
        { eager: true }
        )
    almacenPayment: AlmacenPayment;

    @Column({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    
    

}
