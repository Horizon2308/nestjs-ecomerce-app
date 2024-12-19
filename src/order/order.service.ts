import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from 'src/database/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dtos/order.dto';
import { User } from 'src/database/entities/user.entity';
import { Product } from 'src/database/entities/product.entity';
import { OrderDetail } from 'src/database/entities/order-detail.entity';

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private orderRepository: Repository<Order>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Product)
  private productRepository: Repository<Product>;

  @InjectRepository(OrderDetail)
  private orderDetailRepository: Repository<OrderDetail>;

  async placeOrder(dto: OrderDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: dto.user_id,
      },
    });

    let orderDetails: OrderDetail[] = [];

    console.log(dto);
    console.log(dto.cart_items);

    // Tạo đơn hàng trước để có thể sử dụng order.id trong orderDetail
    const order = this.orderRepository.create({
      user_id: user.id,
      fullname: dto.full_name,
      email: dto.email,
      phone_number: dto.phone_number,
      address: dto.address,
      note: dto.note,
      order_date: Date.now(),
      status: OrderStatus.PENDING,
      total_money: dto.total_money,
      shipping_method: dto.shipping_method,
      shipping_address: dto.shipping_address,
      shipping_date: dto.shipping_date,
      tracking_number: '',
      payment_method: dto.payment_method,
      active: 1,
      order_details: orderDetails, // order_details sẽ được thêm vào sau khi hoàn thành việc xử lý cart_items
    });

    // Lưu đơn hàng để tạo ID order
    const savedOrder = await this.orderRepository.save(order);

    // Tiến hành xử lý từng sản phẩm trong giỏ hàng
    for (const item of dto.cart_items) {
      const product = await this.productRepository.findOne({
        where: {
          id: item.product_id,
        },
      });

      if (product) {
        product.quantity -= item.quantity;
        await this.productRepository.save(product);

        const orderDetail: OrderDetail = this.orderDetailRepository.create({
          price: product.price,
          number_of_products: item.quantity,
          total_money: product.price * item.quantity,
          product_id: product,
          order_id: order,
          color: '',
          status: 1,
        });

        // Lưu orderDetail
        await this.orderDetailRepository.save(orderDetail);
        orderDetails.push(orderDetail);
      }
    }

    savedOrder.order_details = orderDetails;
    await this.orderRepository.save(savedOrder);
  }
}
