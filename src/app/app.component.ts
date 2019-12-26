import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  bannerTitle : string = 'L\'épicerie si la famille';
  bannerText : string = '(en fait c\'est un jeu de mot avec "sisi la famille")';

  srcImg : string = '../assets/images/food.jpg';
}
