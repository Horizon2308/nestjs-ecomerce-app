import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.product_images)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product_id: Product;

    @Column()
  image_url: string;
}
