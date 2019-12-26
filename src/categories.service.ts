import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods" : "GET, POST",
    "Access-Control-Allow-Headers" : "Content-type",
    "Content-type" : "application/json",
    "Access-Control-Allow-Origin" : "*"
  })
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoriesList() : Observable<any> {
    console.log("salut");
    return this.http.get("http://localhost:8080/categories");
  }
}
