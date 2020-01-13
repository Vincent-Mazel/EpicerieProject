import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardCategoriesComponent } from './card-categories/card-categories.component';
import { CardProduitsComponent } from './card-produits/card-produits.component';
import { CardsCategoriesProductsComponent } from './cards-categories-products/cards-categories-products.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http';

import { OrderModule } from 'ngx-order-pipe';
import { ConnexionComponent } from './connexion/connexion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreationCompteComponent } from './creation-compte/creation-compte.component';
import { FooterComponent } from './footer/footer.component';
import { PanierComponent } from './panier/panier.component';

@NgModule({
  declarations: [
    AppComponent,
    CardCategoriesComponent,
    CardProduitsComponent,
    CardsCategoriesProductsComponent,
    CategoriesListComponent,
    ProductsListComponent,
    ConnexionComponent,
    CreationCompteComponent,
    FooterComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
