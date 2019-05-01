import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened:boolean;
  closeOnLinkClicked:boolean;

  constructor() {
    this.opened = !environment.mobileApp;
    this.closeOnLinkClicked = environment.mobileApp;
  }
}
