import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent implements OnInit {

  private utilisateur = {"nom": "", "prenom": "", "email": "", "password": ""};

  emailUtilisateur = {"email": ""};

  password : string = "";
  passwordRepeat : string = "";

  errorMessage : string;

  constructor(private router: Router, private authentificationService: AuthentificationService) { }

  onSubmit() {
    if (this.password != this.passwordRepeat) {
      this.errorMessage = "Les mots de passes sont différents !";
      setTimeout(() => { this.errorMessage = ""; }, 3000);

      this.password = "";
      this.passwordRepeat = "";
    }
    else if (this.utilisateur.nom == "") {
      this.errorMessage = "Renseignez votre nom !";
      setTimeout(() => { this.errorMessage = ""; }, 3000);
    } 
    else if (this.utilisateur.prenom == "") {
      this.errorMessage = "Renseignez votre prenom !";
      setTimeout(() => { this.errorMessage = ""; }, 3000);
    } 
    else if (this.emailUtilisateur.email == "") {
      this.errorMessage = "Renseignez votre email !";
      setTimeout(() => { this.errorMessage = ""; }, 3000);
    } 
    else if (this.password == "") {
      this.errorMessage = "Renseignez votre mot de passe !";
      setTimeout(() => { this.errorMessage = ""; }, 3000);
    }
    else if (this.passwordRepeat == "") {
      this.errorMessage = "Renseignez une deuxième fois votre mot de passe !";
      setTimeout(() => { this.errorMessage = ""; }, 3000);
    }
    else {
      this.authentificationService.emailExists(this.emailUtilisateur).subscribe(reponse => {
        if (reponse["resultat"]) {
          this.errorMessage = "L'email renseigné a déjà été utilisé !";
          setTimeout(() => { this.errorMessage = ""; }, 3000);
  
          this.utilisateur.email = "";
        }
        else {
          this.utilisateur.password = this.password;
          this.utilisateur.email = this.emailUtilisateur.email;
  
          this.authentificationService.createAccount(this.utilisateur).subscribe(val => {
            this.authentificationService.connect(this.utilisateur.email);
            this.router.navigate(["/"]);
      
            this.utilisateur.email = "";
            this.utilisateur.nom = "";
            this.utilisateur.prenom = "";
            this.passwordRepeat = "";
            this.password = "";
          });  
        }
      });
    }
  }

  ngOnInit() {
  }

}
