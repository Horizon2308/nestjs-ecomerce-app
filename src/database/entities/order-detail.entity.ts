import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
  @Column()
  number_of_products: number;
  @Column()
  total_money: number;
  @Column()
  color: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
  @Column()
  status: number;

  @ManyToOne(() => Product, (product) => product.order_details)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product_id: Product;

  @ManyToOne(() => Order, (order) => order.order_details)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
  })
  order_id: Order;
}
