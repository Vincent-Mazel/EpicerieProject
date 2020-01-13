import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  private utilisateur = {"email": "", "password": ""};

  private user: Observable<string>;

  message : String;

  constructor(private authService: AuthentificationService, private router: Router) {
    this.user = authService.getUser();
  }

  onSubmit() {
    this.authService.verificationConnexion(this.utilisateur).subscribe(reponse => {
      if (reponse['resultat']) {
        this.authService.connect(this.utilisateur.email);
        this.message = reponse['message'];

        this.router.navigate([this.router.url]);

        this.message = ""; 
        this.utilisateur.email = "";
        this.utilisateur.password = "";
      }
      else {
        this.message = reponse['message'];
        setTimeout( () => { this.message = ""; }, 5000);
      }
    });
  }

  onClickDeconnexion() {
    this.authService.disconnect();

    if (this.router.url == "/panier") {
      this.router.navigate(["/"]);
    }
    else {
      this.router.navigate([this.router.url]);
    }
  }

  onClickCreationCompte() {
    this.router.navigate(["/creationCompte"]);
  }

  onClickPanier() {
    this.router.navigate(["/panier"]);
  }

  ngOnInit() {
  }

}
