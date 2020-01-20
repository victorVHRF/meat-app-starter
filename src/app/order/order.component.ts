import { Component, OnInit } from '@angular/core';
import {RadioOption} from '../shared/radio/radio-option.model';
import {OrderService} from './order.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from './order.model';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

    orderForm: FormGroup;
    emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    numberPattern = /^[0-9]*$/;
    delivery: number = 8;
    orderId: string;

  paymentOptions: RadioOption[] = [
    {label: 'Dinehiro' , value: 'MON'},
    {label: 'Cartão de Débito' , value: 'DEB'},
    {label: 'Cartão Refeição' , value: 'REF'},
  ]

  constructor(private orderServivce: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  itemsValue(): number {
      return this.orderServivce.itemsValue();
  }

  ngOnInit() {
        this.orderForm = this.formBuilder.group({
           name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
            email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
            emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
            adress: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
            number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
            optionAdress: this.formBuilder.control(''),
            paymentOption: this.formBuilder.control('', [Validators.required])
        }, {validator: OrderComponent.equalsTo});
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
        const email = group.get('email');
        const emailConfirmation = group.get('emailConfirmation');
        if (!email || !emailConfirmation) {
            return undefined;
        }
        if (email.value !== emailConfirmation.value) {
            return {emailsNotMatch: true};
        }
        return undefined;

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

   isOrderCompleted(): boolean {
      return this.orderId !== undefined;
   }
    checkOrder(order: Order) {
        order.orderItems = this.cartItems()
            .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
        this.orderServivce.checkOrder(order)
            .do((orderId: string) => {
                this.orderId = orderId;
            })
            .subscribe((orderId: string) => {
                this.router.navigate(['/order-summary']);
            console.log(`Compra concluida ${orderId}`);
            this.orderServivce.clear();
        });
    }
}
