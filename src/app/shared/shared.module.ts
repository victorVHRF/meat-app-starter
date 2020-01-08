import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from './input/input.component';
import {RadioComponent} from './radio/radio.component';
import {RatingComponent} from './rating/rating.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {RestaurantsService} from '../restaurants/restaurants.service';
import {OrderService} from '../order/order.service';
import {SnackbarComponent} from './messages/snackbar/snackbar.component';
import {NotificationService} from './messages/notification.service';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,

  ],
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
  exports: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent,
            CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {
  static forRoot():  ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ShoppingCartService, RestaurantsService, OrderService, NotificationService]
    };
  }
}
