import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  bannerTitle : string = 'L\'épicerie Si la Famille';
  bannerText : string = '(en fait c\'est un jeu de mot avec "sisi la famille")';

  srcImg : string = '../assets/images/food.jpg';

  constructor(private router: Router) {}

  goToMenu() {
    this.router.navigate(['/']);
  }
}
