import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fullname: string;
  @Column()
  phone_number: string;
  @Column()
  address: string;
  @Column()
  password: string;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
  @Column()
  is_active: number;
  @Column()
  date_of_birth: string;
  @Column()
  facebook_account_id: number;
  @Column()
  google_account_id: number;
  @Column()
  role_id: number;
  @Column()
  avatar: string;
  @Column()
  cic: string;
  @Column()
  sex: number;
  @Column()
  email: string;
}
