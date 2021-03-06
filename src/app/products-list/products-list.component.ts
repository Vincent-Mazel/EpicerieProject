import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import { AuthentificationService } from '../authentification.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  private productsList: Object[] = new Array();
  private categories: Object[] = new Array();

  public selectedCat: string;
  public minPrice: string;
  public maxPrice: string;

  private user: Observable<string>;
  private userEmail: string;

  order: string = 'productName';

  constructor(private categoriesService: CategoriesService, private route : ActivatedRoute, private router : Router, private authService: AuthentificationService) {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.user = authService.getUser();
    }); 
  }

  onClickDeleteFilters() {
    this.router.navigate(['/produits']);
  }

  onClickFilters() {
    if (this.minPrice == "") {
      this.minPrice = undefined;
    }
      
    if (this.maxPrice == "")
      this.maxPrice = undefined;

    if (this.selectedCat != undefined) {
      if (this.minPrice != undefined && this.maxPrice != undefined) {
        this.router.navigate(['/produits/cat/' + this.selectedCat + '/minPrice/' + this.minPrice + '/maxPrice/' + this.maxPrice]);
      }
      else if (this.minPrice != undefined) {
        this.router.navigate(['/produits/cat/' + this.selectedCat + '/minPrice/' + this.minPrice]);
      }
      else if (this.maxPrice != undefined) {
        this.router.navigate(['/produits/cat/' + this.selectedCat + '/maxPrice/' + this.maxPrice]);
      }
      else {
        this.router.navigate(['/produits/cat/' + this.selectedCat]);
      }
    }
    else if (this.minPrice != undefined && this.maxPrice != undefined) {
      this.router.navigate(['/produits/minPrice/' + this.minPrice + '/maxPrice/' + this.maxPrice]);
    }
    else if (this.minPrice != undefined) {
      this.router.navigate(['/produits/minPrice/' + this.minPrice]);
    }
    else if (this.maxPrice != undefined) {
      this.router.navigate(['/produits/maxPrice/' + this.maxPrice]);
    }
  }

  onClickBuyItem(productName: string) {
    let product;

    for (let i = 0; i < this.productsList.length; i++) {
      if (this.productsList[i]["productName"] == productName) {
          product = this.productsList[i];
      }
    }

    let quantite;
    let options = document.getElementById(productName);

    for (let i = 0; i < 5; i++) {
      if (options.childNodes[i]["selected"]) {
        quantite = options.childNodes[i]["label"];
        break;
      } 
    }

    quantite = +quantite;

    this.categoriesService.addProductToPanier(productName, quantite, this.userEmail, product).subscribe(res => {});
  }

  ngOnInit() {
    this.route.params.subscribe((params : Params) => {
        if (params["categorie"] != undefined)
          this.selectedCat = params["categorie"];
         
        if (params["minPrice"] != undefined)
          this.minPrice = params["minPrice"];

        if (params["maxPrice"] != undefined)
          this.maxPrice = params["maxPrice"];

        this.authService.getUser().subscribe(res => {
          this.userEmail = res;

          console.log("user : " + this.userEmail);

          this.categoriesService.getProducts(params["categorie"], params["minPrice"], params["maxPrice"]).subscribe(productsList => {
            this.productsList = productsList;
          });
        });  
    });
  }
}
