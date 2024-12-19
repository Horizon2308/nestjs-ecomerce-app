import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;
@Column()
  name: string;

  @OneToMany(() => Product, (product) => product.provider_id)
  products: Product[];
}
