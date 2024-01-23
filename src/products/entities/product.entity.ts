import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductImage } from './';
import { User } from '../../auth/entities/user.entity';
import { Almacen } from 'src/almacen/entities/almacen.entity';
import { InProduct } from 'src/in-products/entities/in-product.entity';
import { OutProduct } from 'src/out-products/entities/out-product.entity';
import { AlmacenPayment } from 'src/almacen_payment/entities/almacen_payment.entity';

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("json", { nullable: true })
    resource: any;

    // images
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];



    @ManyToMany(type => Almacen)
    @JoinTable()
    almacenes: Almacen[];



    @ManyToOne(
        () => InProduct,
        inProduct => inProduct.product,
        { eager: true }
        )
    inProduct: InProduct;

    @ManyToOne(
        () => OutProduct,
        outProduct => outProduct.product,
        { eager: true }
        )
    outProduct: OutProduct;


    


    
    
    @Column({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}
