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

  constructor(private categoriesService: CategoriesService) {
    this.categoriesList = this.categoriesService.getCategories();  
  }

  ngOnInit() {
    
  }

}
