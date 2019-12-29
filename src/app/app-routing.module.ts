import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsCategoriesProductsComponent } from './cards-categories-products/cards-categories-products.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsListComponent } from './products-list/products-list.component';


const routes: Routes = [
  { path : '',
    component : CardsCategoriesProductsComponent
  },
  { path : 'categories',
  component : CategoriesListComponent
  },
  { path : 'produits',
    component : ProductsListComponent
  },
  { path : 'produits/cat/:categorie',
    component : ProductsListComponent
  },
  { path : 'produits/cat/:categorie/minPrice/:minPrice',
    component : ProductsListComponent
  },
  { path : 'produits/cat/:categorie/maxPrice/:maxPrice',
    component : ProductsListComponent
  },
  { path : 'produits/cat/:categorie/minPrice/:minPrice/maxPrice/:maxPrice',
    component : ProductsListComponent
  },
  { path : 'produits/minPrice/:minPrice/maxPrice/:maxPrice',
    component : ProductsListComponent
  },
  { path : 'produits/minPrice/:minPrice',
    component : ProductsListComponent
  },
  { path : 'produits/maxPrice/:maxPrice',
    component : ProductsListComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
