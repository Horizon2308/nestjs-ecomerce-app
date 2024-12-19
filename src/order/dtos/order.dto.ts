export class CartItemDto {
  product_id: number;
  quantity: number;
}

export class OrderDto {
  user_id: number;

  full_name: string;

  email: string;

  phone_number: string;

  address: string;

  note: string;

  total_money: number;

  shipping_date: Date;

  shipping_method: string;

  shipping_address: string;

  payment_method: string;

  cart_items: CartItemDto[];
}
