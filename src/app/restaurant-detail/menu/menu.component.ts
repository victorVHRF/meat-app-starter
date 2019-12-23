import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../../restaurants/restaurants.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {MenuItem} from '../menu-item/menu-item.modeule';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>;

  constructor(private restauranteServices: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.restauranteServices
        .menuOfRestaurant(this.route.parent.snapshot.params['id']);
  }

}
