import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardCategoriesComponent } from './card-categories/card-categories.component';
import { CardProduitsComponent } from './card-produits/card-produits.component';
import { CardsCategoriesProductsComponent } from './cards-categories-products/cards-categories-products.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CardCategoriesComponent,
    CardProduitsComponent,
    CardsCategoriesProductsComponent,
    CategoriesListComponent,
    ProductsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
