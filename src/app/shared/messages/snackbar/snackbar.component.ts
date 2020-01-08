import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import {NotificationService} from '../notification.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
      trigger('snack-visibility', [
        state('hidden', style({
          opacity: 0,
          bottom: '0px'
        })),
        state('visible', style({
          opacity: 1,
          bottom: '30px'
        })),
          transition('hidden => visible', animate('500ms 0s ease-in')),
          transition('visible => hidden', animate('500ms 0s ease-out'))
      ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hellow there!';
  snackVisibility: string = 'hidden';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
        .do(message => {
      this.message = message;
      this.snackVisibility = 'visible';
    }).switchMap(message => Observable.timer(3000))
        .subscribe(timer => this.snackVisibility = 'hidden');
  }


}
