import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';
import { Search } from './components/search/search';

const routes: Routes = [
  {
    path: 'search/:keyword',
    component: ProductList,
  },

  {
    path: 'category/:id',
    component: ProductList,
  },

  {
    path: 'category',
    component: ProductList,
  },

  {
    path: 'products',
    component: ProductList,
  },

  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [App, ProductList, ProductCategoryMenu, Search],
  imports: [RouterModule.forRoot(routes), BrowserModule, HttpClientModule],
  providers: [ProductService],
  bootstrap: [App],
})
export class AppModule {}
