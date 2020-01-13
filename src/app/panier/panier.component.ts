import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/categories.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  private panier: Object[] = new Array();
  private products: Object[] = new Array();

  private userEmail: string;

  private totalPrice: number;

  order: string = 'productName';

  constructor(private categoriesService: CategoriesService, private router: Router, private authentificationService: AuthentificationService) { }

  onClickAdd(productName: string) {
    for (let i = 0; i < this.panier[0]["products"].length; i++) {
      if (this.panier[0]["products"][i].productName == productName) {
        this.panier[0]["products"][i].quantite += 1;
        this.panier[0]["totalPrice"] += this.panier[0]["products"][i].price;

        this.panier[0]["totalPrice"] = Math.round(this.panier[0]["totalPrice"] * 100)/100;
        this.totalPrice = this.panier[0]["totalPrice"];

        break;
      }
    }

    this.categoriesService.addProductToPanier(productName, 1, this.userEmail, null).subscribe(val => {});
  }

  onClickDelete(productName: string) {
    for (let i = 0; i < this.panier[0]["products"].length; i++) {
      if (this.panier[0]["products"][i].productName == productName) {
        this.panier[0]["products"][i].quantite -= 1;

        this.panier[0]["totalPrice"] -= this.panier[0]["products"][i].price;

        this.panier[0]["totalPrice"] = Math.round(this.panier[0]["totalPrice"] * 100)/100;
        this.totalPrice = this.panier[0]["totalPrice"];

        if (this.panier[0]["products"][i].quantite == 0) {
          document.getElementById(productName).remove();
        }
        
        break;
      }
    }

    this.categoriesService.deleteElement(productName, this.userEmail).subscribe(val => {});
  }

  onClickValidate() {
    console.log("salut");
    this.categoriesService.validatePanier(this.userEmail).subscribe(val => {
      this.router.navigate(["/"]);
    });
  }

  ngOnInit() {
    this.authentificationService.getUser().subscribe(res => {
      this.userEmail = res;

      this.categoriesService.getPanier({ "email": this.userEmail }).subscribe(resultat => {

        if (resultat["panier"][0].products.length > 0) {
          this.panier = resultat["panier"];
          this.products = this.panier[0]["products"];
          this.totalPrice = this.panier[0]["totalPrice"];
        }
      });
    });
  }

}
