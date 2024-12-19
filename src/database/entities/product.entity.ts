import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Provider } from './provider.entity';
import { ProductImage } from './product-image.entity';
import { OrderDetail } from './order-detail.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  thumbnail: string;
  @Column()
  description: string;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category_id: Category;
  @Column()
  active: number;
  @Column()
  quantity: number;
  @Column()
  status: number;

  @ManyToOne(() => Provider, (provider) => provider.products)
  @JoinColumn({
    name: 'provider_id',
    referencedColumnName: 'id',
  })
  provider_id: number;

  @OneToMany(() => ProductImage, (product_image) => product_image.product_id)
  product_images: ProductImage[];

  @OneToMany(() => OrderDetail, (order_detail) => order_detail.product_id)
  order_details: OrderDetail[];
}
