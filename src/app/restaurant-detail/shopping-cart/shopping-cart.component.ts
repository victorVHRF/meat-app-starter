import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shooppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.shooppingCartService.items;
  }
  clear() {
    this.shooppingCartService.clear();
  }

  removeItem(item: any) {
    this.shooppingCartService.removeItem(item);
  }

  addItem(item: any) {
    this.shooppingCartService.addItem(item);
  }
  total(): number {
    return this.shooppingCartService.total();
  }
}
