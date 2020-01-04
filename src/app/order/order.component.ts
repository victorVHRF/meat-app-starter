import { Component, OnInit } from '@angular/core';
import {RadioOption} from '../shared/radio/radio-option.model';
import {OrderService} from './order.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from './order.model';
import {Router} from '@angular/router';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

    delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinehiro' , value: 'MON'},
    {label: 'Cartão de Débito' , value: 'DEB'},
    {label: 'Cartão Refeição' , value: 'REF'},
  ]

  constructor(private orderServivce: OrderService,
              private router: Router) { }

  itemsValue(): number {
      return this.orderServivce.itemsValue();
  }

  ngOnInit() {
  }

  cartItems() {
    return this.orderServivce.cartItems();
  }
   increaseQty(item: CartItem) {
    this.orderServivce.increaseQty(item);
   }
   decreaseQty(item: CartItem) {
    this.orderServivce.decreaseQty(item);
   }
   remove(item: CartItem) {
    this.orderServivce.remove(item);
   }
    checkOrder(order: Order) {
        order.orderItems = this.cartItems()
            .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
        this.orderServivce.checkOrder(order)
            .subscribe((orderId: string) => {
                this.router.navigate(['/order-summary']);
            console.log(`Compra concluida ${orderId}`);
            this.orderServivce.clear();
        });
        console.log(order);
    }
}
