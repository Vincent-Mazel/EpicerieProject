import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-produits',
  templateUrl: './card-produits.component.html',
  styleUrls: ['./card-produits.component.css']
})


export class CardProduitsComponent implements OnInit {
  bannerTitle : string = 'Les produits';
  bannerText : string = 'Des produits a tire larigot sortis de derrière les fagots !';

  srcImg : string = '../assets/images/food.jpg';

  constructor(private router : Router) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/produits']);
  }
}
