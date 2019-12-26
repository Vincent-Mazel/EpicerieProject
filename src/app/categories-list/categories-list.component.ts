import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  private categoriesList: Observable<JSON>;
  
  /* = [
    {
      catName : 'Pomme du congo',
      text : 'Une magnifique pomme provenant du sud de l\'afrique et étant très peu connue du grand public, bien que son goût soit réputé pour être exceptionnel.',
      imgSrc : '../../assets/images/cardProducts.jpg'
    },
    {
      catName : 'Poire acidulée du zimbabwe',
      text : 'Une poire en provenance directe du centre de l\'Afrique, plus gouteuse et juteuse qu\'une poire européenne, mais néanmoins plus chère que cette dernière.',
      imgSrc : '../../assets/images/cardProducts.jpg'
    }
  ]; */

  constructor(private categoriesService: CategoriesService) {
    this.categoriesList = this.categoriesService.getCategoriesList();  
    console.log("oui : " + this.categoriesList);
  }

  ngOnInit() {
    
  }

}
