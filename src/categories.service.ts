import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods" : "GET, POST",
    "Access-Control-Allow-Headers" : "Content-type",
    "Content-type" : "application/json",
    "Access-Control-Allow-Origin" : "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private router : Router) { }

  getCategories() : Observable<any> {
    return this.http.get("http://localhost:8080/categories");
  }

  getProducts(cat : string, minPrice: number, maxPrice: number) : Observable<any> {
    if (cat != undefined) {
      if (minPrice != undefined && maxPrice != undefined) {
        return this.http.get("http://localhost:8080/produits/cat/" + cat + "/minPrice/" + minPrice + "/maxPrice/" + maxPrice);
      }
      else if (minPrice != undefined) {
        return this.http.get("http://localhost:8080/produits/cat/" + cat + "/minPrice/" + minPrice);
      }
      else if (maxPrice != undefined) {
        return this.http.get("http://localhost:8080/produits/cat/" + cat + "/maxPrice/" + maxPrice);
      }
      else {
        return this.http.get("http://localhost:8080/produits/cat/" + cat);
      }
    }
    else if (minPrice != undefined && maxPrice != undefined) {
      return this.http.get("http://localhost:8080/produits/minPrice/" + minPrice + "/maxPrice/" + maxPrice);
    }
    else if (minPrice != undefined) {
      return this.http.get("http://localhost:8080/produits/minPrice/" + minPrice);
    }
    else if (maxPrice != undefined) {
      return this.http.get("http://localhost:8080/produits/maxPrice/" + maxPrice);
    }
    else {
      return this.http.get("http://localhost:8080/produits/");
    }
  }

  getPanier(userEmail) : Observable<any> {
    return this.http.post("http://localhost:8080/panier", JSON.stringify(userEmail), httpOptions);
  }

  addProductToPanier(productName: string, nbToAdd: number, email: string, productDatas) : Observable<any> {
    let jsonParams = { "productName": productName, "nbToAdd": nbToAdd, "email": email, "productDatas": productDatas };
    console.log("add");
    return this.http.post("http://localhost:8080/panier/add", JSON.stringify(jsonParams), httpOptions);
  }

  deleteElement(productName: string, email: string) : Observable<any> {
    let jsonParams = { "productName": productName, "email": email };
    console.log("delete");
    return this.http.post("http://localhost:8080/panier/deleteOne", JSON.stringify(jsonParams), httpOptions);
  }

  validatePanier(email: string) : Observable<any> {
    let jsonParam = { "email": email };

    return this.http.post("http://localhost:8080/panier/deletePanier", JSON.stringify(jsonParam), httpOptions);
  }
}
