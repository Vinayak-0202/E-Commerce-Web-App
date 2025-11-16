import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.css', 
  standalone: false,
})
export class ProductCategoryMenu implements OnInit { 
  
  productCategories: ProductCategory[] = []; 

  constructor(private productService:ProductService ) {}

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe({
      next: (data: ProductCategory[]) => {
        this.productCategories = data;
      }
    });
  }

}
