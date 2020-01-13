import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

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
export class AuthentificationService {
  private user: Subject<string> = new BehaviorSubject<string>(undefined);
  private baseURL: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getUser() {
    return this.user;
  }

  getUserMail(){
    return this.user['email'];
  }

  connect(data: string) {
    this.user.next(data);
  }

  disconnect() {
    this.user.next(null);
  }

  verificationConnexion(identifiants) : Observable<any> {
    return this.http.post(this.baseURL + 'membre/connexion', JSON.stringify(identifiants), httpOptions); 
  }

  emailExists(emailUtilisateur) : Observable<any> {
    return this.http.post(this.baseURL + 'membre/checkEmail', JSON.stringify(emailUtilisateur), httpOptions);
  }

  createAccount(utilisateur) : Observable<any> {
    return this.http.post(this.baseURL + 'membre/creationCompte', JSON.stringify(utilisateur), httpOptions); 
  }
}
