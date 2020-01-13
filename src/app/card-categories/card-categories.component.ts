import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-card-categories',
  templateUrl: './card-categories.component.html',
  styleUrls: ['./card-categories.component.css']
})


export class CardCategoriesComponent implements OnInit {

  private user: Observable<string>

  constructor(private router : Router, private authService : AuthentificationService) {
    this.user = authService.getUser();
    console.log("salut : " + this.user);
   }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/categories']);
  }
}
