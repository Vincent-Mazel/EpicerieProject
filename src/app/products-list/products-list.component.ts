import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productsList = [
    {
      name : 'Pomme du congo',
      text : 'Une magnifique pomme provenant du sud de l\'afrique et étant très peu connue du grand public, bien que son goût soit réputé pour être exceptionnel.',
      categorie : 'Fruit',
      imgSrc : '../../assets/images/cardProducts.jpg'
    },
    {
      name : 'Poire acidulée du zimbabwe',
      text : 'Une poire en provenance directe du centre de l\'Afrique, plus gouteuse et juteuse qu\'une poire européenne, mais néanmoins plus chère que cette dernière.',
      categorie : 'Légume',
      imgSrc : '../../assets/images/cardProducts.jpg'
    }
  ];

  categories = ["legume", "legumineuse", "oeuf"];

  constructor() { }

  ngOnInit() {
  }

}
